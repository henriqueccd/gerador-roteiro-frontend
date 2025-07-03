// Lista de temas que o agente vai apresentar (copiada do seu comando final)
const themes = [
    "A Herança Maldita: A fortuna da família revelou segredos e destruiu laços que eu jurava serem inquebráveis.",
    "O Filho Secreto: Descobri que meu pai tinha uma segunda família, e minha vida virou de cabeça para baixo.",
    "A Troca de Bebês: Toda a minha vida foi uma mentira: fui trocada na maternidade e cresci na família errada.",
    "O Segredo da Empregada: A pessoa que cuidou de mim a vida inteira guardava um segredo obscuro sobre minha verdadeira origem.",
    "A Vingança do Passado: Um erro do passado da minha família voltou para nos assombrar, e eu paguei o preço.",
    "O Irmão Inveja: Meu próprio irmão fez de tudo para me derrubar e roubar o que era meu por direito.",
    "A Madrasta Manipuladora: Minha madrasta transformou a casa dos meus pais em um inferno, e meu pai não via.",
    "O Amor Proibido: Me apaixonei pela pessoa errada, e isso causou um escândalo que dividiu minha família.",
    "A Fuga da Realidade: Tentei escapar da minha família tóxica, mas o passado sempre me alcançava.",
    "A Traição no Altar: No dia do meu casamento, descobri uma traição que mudou tudo.",
    "O Desaparecimento Misterioso: A pessoa que eu mais amava sumiu sem deixar rastros, e a verdade era mais sombria do que eu imaginava.",
    "A Rede de Mentiras: Minha família vivia em uma teia de mentiras, e eu fui o último a descobrir a verdade.",
    "O Sacrifício Esquecido: Fiz um sacrifício enorme pela minha família, mas eles nunca reconheceram.",
    "A Revelação da Doença: Uma doença grave na família trouxe à tona conflitos e segredos guardados a sete chaves.",
    "O Retorno Inesperado: Alguém do meu passado que eu julgava morto reapareceu, trazendo caos e revelações.",
    "A Disputa pela Guarda: A batalha pela guarda do meu filho revelou o pior da minha ex-família.",
    "O Golpe da Família: Fui enganado e roubado pelas pessoas em quem mais confiava: minha própria família.",
    "A Identidade Roubada: Alguém se passou por mim, e eu tive que lutar para provar quem eu realmente era.",
    "O Acidente Fatal: Um acidente na família escondeu uma verdade terrível que ninguém queria revelar.",
    "A Herdeira Deserdada: Fui deserdado sem motivo aparente, e tive que lutar para provar meu valor e minha verdade."
];

const themeListDiv = document.getElementById('theme-list'); // Pega a div do HTML pelo ID
if (themeListDiv) { // Adiciona uma verificação para garantir que o elemento existe
    themeListDiv.innerHTML = ''; // Limpa o "Carregando temas..."

    // Loop para adicionar cada tema como um parágrafo numerado
    themes.forEach((theme, index) => {
        const p = document.createElement('p'); // Cria um novo parágrafo HTML
        p.textContent = `${index + 1}. ${theme}`; // Adiciona o número e o texto do tema
        themeListDiv.appendChild(p); // Coloca o parágrafo dentro da div de temas
    });
}

// Pegando referências aos elementos HTML
const generateButton = document.getElementById('generate-button');
// --- LINHA ADICIONADA PARA DEBUG (VERIFICAR SE O BOTÃO É ENCONTRADO) ---
console.log('Botão Gerar Roteiro (ao carregar):', generateButton); 
// --- FIM DA LINHA DE DEBUG ---
const selectedThemeInput = document.getElementById('selected-theme-input');
const videoDurationInput = document.getElementById('video-duration'); // Este input NÃO será mais enviado ao backend
const numBlocksInput = document.getElementById('num-blocks');
const generatedRoteiroDiv = document.getElementById('generated-roteiro');
const copyButton = document.getElementById('copy-button');
const downloadSrtButton = document.getElementById('download-srt-button');

// --- NOVAS REFERÊNCIAS PARA OS CAMPOS EDITÁVEIS (ADICIONADO AQUI) ---
const editedTitlesInput = document.getElementById('edited-titles');
const editedHeadlineInput = document.getElementById('edited-headline');
const editedCtaInput = document.getElementById('edited-cta');
const thumbNameInput = document.getElementById('thumb-name');
const thumbAgeInput = document.getElementById('thumb-age');
const thumbCharacteristicsInput = document.getElementById('thumb-characteristics');
const thumbVisualElementInput = document.getElementById('thumb-visual-element');
const editOutputSection = document.querySelector('.edit-output-section'); // Pega a seção de edição completa

// Inicialmente esconde a seção de edição (ela aparecerá após gerar o roteiro)
if (editOutputSection) {
    editOutputSection.style.display = 'none';
}
// --- FIM DAS NOVAS REFERÊNCIAS E ESCONDER SEÇÃO ---


// Adicionando um "ouvinte de evento" ao botão Gerar Roteiro
if (generateButton) { // Verificação para garantir que o botão existe
    // --- LINHA ADICIONADA PARA DEBUG (VERIFICAR SE O OUVINTE É CONFIGURADO) ---
    console.log('Ouvinte de evento de clique configurado para o botão Gerar Roteiro.');
    // --- FIM DA LINHA DE DEBUG ---

    generateButton.addEventListener('click', async () => { // Adicionado 'async' aqui
        // --- LINHA ADICIONADA PARA DEBUG (VERIFICAR SE A FUNÇÃO É INICIADA) ---
        console.log('>>> Botão clicado! Iniciando processamento...');
        // --- FIM DA LINHA DE DEBUG ---

        const selectedThemeNumber = parseInt(selectedThemeInput.value); // Pega o número do tema e converte para número
        // const videoDuration = parseInt(videoDurationInput.value); // REMOVIDO: Duração não será mais coletada para envio
        const numBlocks = parseInt(numBlocksInput.value); // Pega o número de blocos

        // Validação básica dos inputs (mantido do código anterior)
        if (isNaN(selectedThemeNumber) || selectedThemeNumber < 1 || selectedThemeNumber > themes.length) {
            generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, escolha um número de tema válido (entre 1 e ' + themes.length + ').</p>';
            console.warn('>>> Validação falhou: Tema inválido.'); // Debug
            return;
        }
        // Validação da duração removida, pois não será enviada
        // if (isNaN(videoDuration) || videoDuration < 5 || videoDuration > 120) {
        //     generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, insira uma duração de vídeo válida (entre 5 e 120 minutos).</p>';
        //     console.warn('>>> Validação falhou: Duração inválida.'); // Debug
        //     return;
        // }
        if (isNaN(numBlocks) || numBlocks < 1 || numBlocks > 10) {
            generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, insira um número de blocos válido (entre 1 e 10).</p>';
            console.warn('>>> Validação falhou: Blocos inválidos.'); // Debug
            return;
        }

        const chosenTheme = themes[selectedThemeNumber - 1]; // Pega o texto do tema selecionado
        
        generatedRoteiroDiv.innerHTML = '<p><strong>Gerando seu roteiro... Enviando para o servidor Python!</strong></p>';
        console.log('>>> Enviando requisição para o backend...'); // Debug

        // --- INÍCIO DA CONEXÃO COM O BACKEND PYTHON ---
        try {
            const response = await fetch('https://gerador-roteiro-backend.onrender.com/generate-roteiro', {
                method: 'POST', // Estamos enviando dados, então é um POST
                headers: {
                    'Content-Type': 'application/json' // Dizemos ao servidor que estamos enviando JSON
                },
                body: JSON.stringify({ // Converte os dados para JSON e envia
                    tema: chosenTheme,
                    // duracao: videoDuration, // REMOVIDO: Duração não será mais enviada no body
                    blocos: numBlocks
                })
            });

            if (!response.ok) { // Verifica se a resposta do servidor foi bem-sucedida (código 200)
                // Tentativa de obter mais detalhes do erro do servidor
                let errorDetails = response.statusText;
                try {
                    const errorJson = await response.json();
                    if (errorJson && errorJson.error) {
                        errorDetails = errorJson.error;
                    }
                } catch (e) {
                    // Ignora se não conseguir parsear o JSON do erro
                }
                throw new Error(`Erro do servidor (${response.status}): ${errorDetails}`);
            }

            const data = await response.json(); // Pega a resposta do servidor e converte de JSON para objeto JavaScript
            console.log('>>> Resposta do backend recebida:', data); // Debug

            // --- AGORA, EXIBIMOS APENAS A HISTÓRIA E PREENCHEMOS OS NOVOS CAMPOS ---
            let fullRoteiroDisplay = `
🟠 **TEMA ESCOLHIDO:** ${data.tema_sugerido}
`;
            // Apenas o texto da história, sem blocos numerados automáticos, e com parágrafos entre eles
            data.historia.forEach((blockText) => { // 'index' não é mais usado aqui, pois não numeramos os blocos na exibição
                fullRoteiroDisplay += `<p>${blockText}</p>\n`; // Adiciona cada bloco como um parágrafo HTML
            });

            // Não incluímos mais os dados extras no fullRoteiroDisplay, pois eles vão para os campos
            // Apenas um lembrete visual para o SRT
            fullRoteiroDisplay += `
📄 **Download do arquivo SRT (clique no botão abaixo)**
            `;

            generatedRoteiroDiv.innerHTML = fullRoteiroDisplay;

            // PREENCHENDO OS NOVOS CAMPOS EDITÁVEIS
            if (editedTitlesInput) editedTitlesInput.value = data.titulos_sugeridos ? data.titulos_sugeridos.join('\n- ') : '';
            if (editedHeadlineInput) editedHeadlineInput.value = data.headline_chamativa || '';
            if (editedCtaInput) editedCtaInput.value = data.cta_final || '';
            if (thumbNameInput) thumbNameInput.value = data.elementos_thumbnail ? data.elementos_thumbnail.nome_personagem : '';
            if (thumbAgeInput) thumbAgeInput.value = data.elementos_thumbnail ? data.elementos_thumbnail.idade_personagem : '';
            if (thumbCharacteristicsInput) thumbCharacteristicsInput.value = data.elementos_thumbnail ? data.elementos_thumbnail.caracteristicas_fisicas : '';
            if (thumbVisualElementInput) thumbVisualElementInput.value = data.elementos_thumbnail ? data.elementos_thumbnail.elemento_visual_chave : '';

            // Mostra a seção de edição após a geração
            if (editOutputSection) {
                editOutputSection.style.display = 'block';
            }

            // Armazena o srt_completo para o botão de download
            generatedRoteiroDiv._lastGeneratedSrt = data.srt_completo;
            
            console.log('>>> Roteiro exibido e campos preenchidos na tela.');

        } catch (error) {
            console.error('Erro ao gerar roteiro (Catch block):', error);
            generatedRoteiroDiv.innerHTML = `<p style="color: red;">Erro ao gerar roteiro: ${error.message}. Verifique se o servidor Python está rodando e tente novamente.</p>`;
            if (editOutputSection) { // Esconde a seção de edição se houver erro
                editOutputSection.style.display = 'none';
            }
        }
        // --- FIM DA CONEXÃO COM O BACKEND PYTHON ---
    });
}


// --- INÍCIO DO CÓDIGO DOS BOTÕES DE COPIAR E BAIXAR SRT (AJUSTADO) ---

// Adicionando ouvintes de evento aos botões de Copiar e Baixar SRT
if (copyButton) {
    copyButton.addEventListener('click', () => {
        // Para copiar, queremos o conteúdo da história principal e dos campos editáveis
        const storyParagraphs = generatedRoteiroDiv.querySelectorAll('p').filter(p => 
            !p.classList.contains('error') && !p.closest('.output-section').querySelector('p').includes('Gerando seu roteiro...') // Filtra parágrafos de erro ou de status de geração
        ).map(p => p.textContent).join('\n\n'); 

        const textToCopy = `
TEMA: ${generatedRoteiroDiv.querySelector('b:first-child').nextSibling.textContent.trim()}

HISTÓRIA:
${storyParagraphs}

TÍTULOS SUGERIDOS:
${editedTitlesInput ? editedTitlesInput.value : ''}

HEADLINE CHAMATIVA:
${editedHeadlineInput ? editedHeadlineInput.value : ''}

CHAMADA À AÇÃO FINAL:
${editedCtaInput ? editedCtaInput.value : ''}

ELEMENTOS PARA THUMBNAIL:
Nome do Personagem Principal: ${thumbNameInput ? thumbNameInput.value : ''}
Idade do Personagem Principal: ${thumbAgeInput ? thumbAgeInput.value : ''}
Características Físicas: ${thumbCharacteristicsInput ? thumbCharacteristicsInput.value : ''}
Elemento Visual Chave: ${thumbVisualElementInput ? thumbVisualElementInput.value : ''}
`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Roteiro copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Não foi possível copiar o roteiro. Por favor, copie manualmente.');
        });
    });
}

if (downloadSrtButton) {
    downloadSrtButton.addEventListener('click', () => {
        // Pega o SRT da última resposta da IA, que foi armazenado no generatedRoteiroDiv._lastGeneratedSrt
        const srtContent = generatedRoteiroDiv._lastGeneratedSrt;

        if (srtContent) {
            const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'roteiro_gerado.srt'; // Nome do arquivo
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('Arquivo SRT baixado!');
        } else {
            alert('Nenhum SRT encontrado para download. Gere um roteiro primeiro.');
        }
    });
}