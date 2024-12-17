// Caminho do PDF
const url = './your.pdf';

// Configuração do workerSrc necessário para PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Referência ao flipbook
const flipbook = document.getElementById('flipbook');

// Carregar o PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages;
    let pagesLoaded = 0;

    // Função para renderizar cada página
    const renderPage = (pageNum) => {
        return pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            return page.render({ canvasContext: context, viewport }).promise.then(() => {
                // Adiciona o canvas dentro de um elemento div
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page';
                pageDiv.appendChild(canvas);
                flipbook.appendChild(pageDiv);

                pagesLoaded++;

                // Inicializa o Turn.js quando todas as páginas estiverem carregadas
                if (pagesLoaded === totalPages) {
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
}).catch(error => {
    console.error('Erro ao carregar o PDF:', error);
});
