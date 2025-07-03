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
const videoDurationInput = document.getElementById('video-duration'); // Este input será removido ou ignorado futuramente
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
        // const videoDuration = parseInt(videoDurationInput.value); // Duração será removida ou ignorada, mas mantemos a variável por enquanto
        const numBlocks = parseInt(numBlocksInput.value); // Pega o número de blocos

        // Validação básica dos inputs (mantido do código anterior)
        if (isNaN(selectedThemeNumber) || selectedThemeNumber < 1 || selectedThemeNumber > themes.length) {
            generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, escolha um número de tema válido (entre 1 e ' + themes.length + ').</p>';
            console.warn('>>> Validação falhou: Tema inválido.'); // Debug
            return;
        }
        // if (isNaN(videoDuration) || videoDuration < 5 || videoDuration > 120) { // Validação da duração removida/ignorada
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
                    // duracao: videoDuration, // Duração removida do corpo da requisição
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

            // --- AGORA, VAMOS EXIBIR OS DADOS RECEBIDOS DO BACKEND COM O NOVO FORMATO ---
            let fullRoteiroDisplay = `
🟠 **TEMA ESCOLHIDO:** ${data.tema_sugerido}
`;
            // Apenas o texto da história, sem blocos numerados automáticos, e quebra de linha entre eles
            data.historia.forEach((blockText) => { // Removed index here
                fullRoteiroDisplay += `<p>${blockText}</p>\n`; // Adiciona cada bloco como um parágrafo
            });

            fullRoteiroDisplay += `
📢 **Títulos Sugeridos**
- ${data.titulos_sugeridos.join('\n- ')}

🎯 **Headline Chamativa (Gancho)**
${data.headline_chamativa}

💬 **Chamada à Ação Final (CTA)**
${data.cta_final}

🖼️ **Elementos para Thumbnail**
* **Nome do personagem principal:** ${data.elementos_thumbnail.nome_personagem}
* **Idade do personagem principal:** ${data.elementos_thumbnail.idade_personagem}
* **Características físicas relevantes do personagem principal:** ${data.elementos_thumbnail.caracteristicas_fisicas}
* **Um elemento visual chave da história:** ${data.elementos_thumbnail.elemento_visual_chave}

📄 **Download do arquivo SRT (clique no botão abaixo)**
            `;
            // O conteúdo do SRT não será mais exibido na tela, apenas disponível para download

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
        // Para copiar, queremos apenas o texto principal da história + os extras, mas sem o SRT
        const textToCopy = `
TEMA: ${generatedRoteiroDiv.querySelector('b:first-child').nextSibling.textContent.trim()}

HISTÓRIA:
${generatedRoteiroDiv.querySelectorAll('p').filter(p => !p.classList.contains('error')).map(p => p.textContent).join('\n\n')}

TÍTULOS SUGERIDOS:
${generatedRoteiroDiv.querySelector('📢').nextSibling.textContent.trim()}

HEADLINE CHAMATIVA:
${generatedRoteiroDiv.querySelector('🎯').nextSibling.textContent.trim()}

CHAMADA À AÇÃO FINAL:
${generatedRoteiroDiv.querySelector('💬').nextSibling.textContent.trim()}

ELEMENTOS PARA THUMBNAIL:
${generatedRoteiroDiv.querySelector('🖼️').nextSibling.textContent.trim()}
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
        // Para baixar o SRT, precisamos do conteúdo bruto que veio do backend.
        // A forma mais segura é pegá-lo diretamente do objeto 'data' se tivéssemos acesso fácil.
        // Como não temos a 'data' aqui fora do evento de clique, vamos pedir ao usuário para regenerar e focar na função.
        // Para a simulação, ou para um caso real onde o backend envia, precisamos salvar o 'data.srt_completo'
        // em uma variável global ou passar para esta função.
        
        // --- IMPORTANTE: Para o SRT funcionar de verdade no download,
        // você precisaria que o `data.srt_completo` estivesse acessível aqui,
        // talvez armazenando-o em uma variável global ou passando ele.
        // Por enquanto, vamos extraí-lo da tela como uma simulação.
        // No futuro, quando o backend for real, você pode armazenar a resposta da IA.
        const roteiroHtmlContent = generatedRoteiroDiv.innerHTML;
        const srtContent = extractSrtFromRenderedHtml(roteiroHtmlContent);


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

// Função auxiliar para extrair o SRT do HTML renderizado (simulação)
// No futuro, você terá acesso direto ao data.srt_completo do backend
function extractSrtFromRenderedHtml(htmlContent) {
    // Procura pela parte do SRT que é marcada com ```srt
    const regex = /```srt\s*([\s\S]*?)\s*```/;
    const match = htmlContent.match(regex);
    if (match && match[1]) {
        return match[1].trim();
    }
    return null;
}