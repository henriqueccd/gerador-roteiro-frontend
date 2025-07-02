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
const videoDurationInput = document.getElementById('video-duration');
const numBlocksInput = document.getElementById('num-blocks');
const generatedRoteiroDiv = document.getElementById('generated-roteiro');
const copyButton = document.getElementById('copy-button');
const downloadSrtButton = document.getElementById('download-srt-button');


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
        const videoDuration = parseInt(videoDurationInput.value); // Pega a duração
        const numBlocks = parseInt(numBlocksInput.value); // Pega o número de blocos

        // --- LINHA ADICIONADA PARA DEBUG (VERIFICAR VALORES DOS INPUTS) ---
        console.log('>>> Valores dos inputs:', { selectedThemeNumber, videoDuration, numBlocks });
        // --- FIM DA LINHA DE DEBUG ---

        // Validação básica dos inputs (mantido do código anterior)
        if (isNaN(selectedThemeNumber) || selectedThemeNumber < 1 || selectedThemeNumber > themes.length) {
            generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, escolha um número de tema válido (entre 1 e ' + themes.length + ').</p>';
            console.warn('>>> Validação falhou: Tema inválido.'); // Debug
            return;
        }
        if (isNaN(videoDuration) || videoDuration < 5 || videoDuration > 120) {
            generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, insira uma duração de vídeo válida (entre 5 e 120 minutos).</p>';
            console.warn('>>> Validação falhou: Duração inválida.'); // Debug
            return;
        }
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
                    duracao: videoDuration,
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

            // Agora, vamos exibir os dados recebidos do backend
            let fullRoteiroDisplay = `
🟠 **TEMA SUGERIDO**
${data.tema_sugerido}

📝 **História em ${numBlocks} blocos (Duração Total: ${videoDuration} minutos)**
`;

            // Adiciona cada bloco da história (que é um array no backend)
            data.historia.forEach((blockText, index) => {
                fullRoteiroDisplay += `**Bloco ${index + 1}:**\n${blockText}\n\n`;
            });

            fullRoteiroDisplay += `
📢 **Títulos sugeridos**
- ${data.titulos_sugeridos.join('\n- ')}

🎯 **Headline chamativa (gancho)**
${data.headline_chamativa}

💬 **Chamada à ação final (CTA)**
${data.cta_final}

🖼️ **Elementos para Thumbnail**
* **Nome do personagem principal:** ${data.elementos_thumbnail.nome_personagem}
* **Idade do personagem principal:** ${data.elementos_thumbnail.idade_personagem}
* **Características físicas relevantes do personagem principal:** ${data.elementos_thumbnail.caracteristicas_fisicas}
* **Um elemento visual chave da história:** ${data.elementos_thumbnail.elemento_visual_chave}

📄 **Download do arquivo \`.srt\` (texto formatado no final)**
\`\`\`srt
${data.srt_completo}
\`\`\`
            `;

            generatedRoteiroDiv.innerHTML = fullRoteiroDisplay;
            console.log('>>> Roteiro exibido na tela.'); // Debug

        } catch (error) {
            console.error('Erro ao gerar roteiro (Catch block):', error);
            generatedRoteiroDiv.innerHTML = `<p style="color: red;">Erro ao gerar roteiro: ${error.message}. Verifique se o servidor Python está rodando e tente novamente.</p>`;
        }
        // --- FIM DA CONEXÃO COM O BACKEND PYTHON ---
    });
}


// --- INÍCIO DO CÓDIGO DOS BOTÕES DE COPIAR E BAIXAR SRT ---

// Adicionando ouvintes de evento aos botões de Copiar e Baixar SRT
if (copyButton) {
    copyButton.addEventListener('click', () => {
        const textToCopy = generatedRoteiroDiv.innerText; // Pega todo o texto da área do roteiro
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
        const roteiroText = generatedRoteiroDiv.innerText; // Pega o texto da área do roteiro
        const srtContent = extractSrtFromRoteiro(roteiroText); // Função para extrair SRT, que você verá em breve

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
            alert('Arquivo SRT simulado baixado!');
        } else {
            alert('Nenhum SRT encontrado ou gerado para download.');
        }
    });
}

// Função auxiliar para simular a extração do SRT.
// No futuro, o SRT virá separado da API e não precisará ser extraído assim.
function extractSrtFromRoteiro(fullRoteiroText) {
    const srtStartTag = '📄 **Download do arquivo `.srt` (texto formatado no final)**';
    const srtStartIndex = fullRoteiroText.indexOf(srtStartTag);
    if (srtStartIndex === -1) return null;

    let srtContent = fullRoteiroText.substring(srtStartIndex + srtStartTag.length).trim();
    // Remove possíveis cabeçalhos do formato de saída
    srtContent = srtContent.replace(/^```srt\n/, '').replace(/\n```$/, '').trim();
    return srtContent;
}