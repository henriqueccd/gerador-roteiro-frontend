document.addEventListener('DOMContentLoaded', () => {
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

    const themeListDiv = document.getElementById('theme-list');
    if (themeListDiv) {
        themeListDiv.innerHTML = '';
        themes.forEach((theme, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${theme}`;
            themeListDiv.appendChild(p);
        });
    }

    // Pegando referências aos elementos HTML
    const generateButton = document.getElementById('generate-button');
    console.log('Botão Gerar Roteiro (ao carregar):', generateButton);
    const selectedThemeInput = document.getElementById('selected-theme-input');
    const videoDurationInput = document.getElementById('video-duration'); // <-- Referência para o input de duração
    const numBlocksInput = document.getElementById('num-blocks');
    const generatedRoteiroDiv = document.getElementById('generated-roteiro');
    const copyButton = document.getElementById('copy-button');
    const downloadSrtButton = document.getElementById('download-srt-button');

    // NOVAS REFERÊNCIAS PARA OS CAMPOS EDITÁVEIS
    const editedTitlesInput = document.getElementById('edited-titles');
    const editedHeadlineInput = document.getElementById('edited-headline');
    const editedCtaInput = document.getElementById('edited-cta');
    const thumbNameInput = document.getElementById('thumb-name');
    const thumbAgeInput = document.getElementById('thumb-age');
    const thumbCharacteristicsInput = document.getElementById('thumb-characteristics');
    const thumbVisualElementInput = document.getElementById('thumb-visual-element');
    const editOutputSection = document.querySelector('.edit-output-section'); // Pega a seção de edição completa

    // Inicialmente esconde a seção de edição
    if (editOutputSection) {
        editOutputSection.style.display = 'none';
    }

    // Adicionando um "ouvinte de evento" ao botão Gerar Roteiro
    if (generateButton) {
        console.log('Ouvinte de evento de clique configurado para o botão Gerar Roteiro.');

        generateButton.addEventListener('click', async () => {
            console.log('>>> Botão clicado! Iniciando processamento...');

            const selectedThemeNumber = parseInt(selectedThemeInput.value);
            const videoDuration = parseInt(videoDurationInput.value); // <-- Coletando a duração novamente
            const numBlocks = parseInt(numBlocksInput.value);

            // Validação básica dos inputs
            if (isNaN(selectedThemeNumber) || selectedThemeNumber < 1 || selectedThemeNumber > themes.length) {
                generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, escolha um número de tema válido (entre 1 e ' + themes.length + ').</p>';
                console.warn('>>> Validação falhou: Tema inválido.');
                return;
            }
            // Validação da duração reintroduzida
            if (isNaN(videoDuration) || videoDuration < 5 || videoDuration > 120) {
                generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, insira uma duração de vídeo válida (entre 5 e 120 minutos).</p>';
                console.warn('>>> Validação falhou: Duração inválida.');
                return;
            }
            if (isNaN(numBlocks) || numBlocks < 1 || numBlocks > 10) {
                generatedRoteiroDiv.innerHTML = '<p style="color: red;">Por favor, insira um número de blocos válido (entre 1 e 10).</p>';
                console.warn('>>> Validação falhou: Blocos inválidos.');
                return;
            }

            const chosenTheme = themes[selectedThemeNumber - 1];
            
            generatedRoteiroDiv.innerHTML = '<p><strong>Gerando seu roteiro... Enviando para o servidor Python!</strong></p>';
            console.log('>>> Enviando requisição para o backend...');

            // --- INÍCIO DA CONEXÃO COM O BACKEND PYTHON ---
            try {
                const response = await fetch('https://gerador-roteiro-backend.onrender.com/generate-roteiro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ // Enviando duração novamente
                        tema: chosenTheme,
                        duracao: videoDuration, // <-- Enviando a duração novamente no body
                        blocos: numBlocks
                    })
                });

                if (!response.ok) {
                    let errorDetails = response.statusText;
                    try {
                        const errorJson = await response.json();
                        if (errorJson && errorJson.error) {
                            errorDetails = errorJson.error;
                        }
                    } catch (e) {}
                    throw new Error(`Erro do servidor (${response.status}): ${errorDetails}`);
                }

                const data = await response.json();
                console.log('>>> Resposta do backend recebida:', data);

                // --- AGORA, EXIBIMOS APENAS A HISTÓRIA E PREENCHEMOS OS NOVOS CAMPOS ---
                let fullRoteiroDisplay = `
🟠 **TEMA ESCOLHIDO:** ${data.tema_sugerido}

`; // Mantido o tema aqui para cabeçalho, mas removido da cópia total se não quiser.

                // Apenas o texto da história, sem blocos numerados automáticos, e com parágrafos entre eles
                data.historia.forEach((blockText) => {
                    fullRoteiroDisplay += `<p>${blockText}</p>\n`;
                });

                // Apenas um lembrete visual para o SRT
                fullRoteiroDisplay += `
📄 **Download do arquivo SRT (clique no botão abaixo)**
                `;

                generatedRoteiroDiv.innerHTML = fullRoteiroDisplay;

                // PREENCHENDO OS NOVOS CAMPOS EDITÁVEIS
                if (editedTitlesInput) editedTitlesInput.value = data.titulos_sugeridos ? data.titulos_sugeridos.join('\n') : '';
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
                generatedRoteiroDiv.innerHTML = `<p style="color: red;">Erro ao gerar roteiro: ${error.message}. Verifique o console para mais detalhes.</p>`;
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
            // Pega o conteúdo da história principal e dos campos editáveis
            const storyParagraphs = generatedRoteiroDiv.querySelectorAll('p').filter(p => 
                !p.classList.contains('error') && !p.closest('.output-section').querySelector('p').textContent.includes('Gerando seu roteiro...') // Filtra parágrafos de erro ou de status de geração
            ).map(p => p.textContent).join('\n\n'); 
            
            // Certifique-se de que os campos de ajuste editáveis estão disponíveis antes de tentar acessá-los
            const titlesValue = editedTitlesInput ? editedTitlesInput.value : '';
            const headlineValue = editedHeadlineInput ? editedHeadlineInput.value : '';
            const ctaValue = editedCtaInput ? editedCtaInput.value : '';
            const thumbNameValue = thumbNameInput ? thumbNameInput.value : '';
            const thumbAgeValue = thumbAgeInput ? thumbAgeInput.value : '';
            const thumbCharacteristicsValue = thumbCharacteristicsInput ? thumbCharacteristicsInput.value : '';
            const thumbVisualElementValue = thumbVisualElementInput ? thumbVisualElementInput.value : '';

            const textToCopy = `
TEMA: ${generatedRoteiroDiv.querySelector('🟠').nextSibling.textContent.trim()}

HISTÓRIA:
${storyParagraphs}

TÍTULOS SUGERIDOS:
${titlesValue}

HEADLINE CHAMATIVA:
${headlineValue}

CHAMADA À AÇÃO FINAL:
${ctaValue}

ELEMENTOS PARA THUMBNAIL:
Nome do Personagem Principal: ${thumbNameValue}
Idade do Personagem Principal: ${thumbAgeValue}
Características Físicas: ${thumbCharacteristicsValue}
Elemento Visual Chave: ${thumbVisualElementValue}
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
            const srtContent = generatedRoteiroDiv._lastGeneratedSrt;

            if (srtContent) {
                const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'roteiro.srt'; // Nome do arquivo
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

    // Lógica para os botões individuais de copiar (adicionados no HTML)
    document.querySelectorAll('.copy-field-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            copyToClipboard(targetId);
        });
    });

    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.select();
            element.setSelectionRange(0, 99999); // Para dispositivos móveis
            document.execCommand('copy');
            alert('Copiado para a área de transferência!');
        }
    }
});