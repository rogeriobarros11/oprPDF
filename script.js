const url = './your.pdf'; // Caminho do PDF no diretório raiz
const flipbook = document.getElementById('flipbook'); // Contêiner principal

pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages; // Número total de páginas
    let loadedPages = 0; // Contador de páginas renderizadas

    // Função para renderizar cada página
    const renderPage = (pageNum) => {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 }); // Tamanho da página
            const canvas = document.createElement('canvas'); // Canvas para a página
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            page.render({ canvasContext: context, viewport }).promise.then(() => {
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page'; // Classe que Turn.js precisa
                pageDiv.appendChild(canvas); // Adiciona o canvas à página
                flipbook.appendChild(pageDiv); // Adiciona ao flipbook

                loadedPages++;

                // Inicializa o Turn.js após todas as páginas carregarem
                if (loadedPages === totalPages) {
                    $('#flipbook').turn({
                        width: 800,
                        height: 600,
                        autoCenter: true
                    });
                }
            });
        });
    };

    // Renderiza todas as páginas
    for (let i = 1; i <= totalPages; i++) {
        renderPage(i);
    }
}).catch(err => console.error('Erro ao carregar o PDF:', err));
