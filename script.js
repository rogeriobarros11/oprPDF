const url = './your.pdf'; // Caminho do arquivo PDF
const flipbook = document.getElementById('flipbook');

// Carrega o PDF com PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages; // Número total de páginas
    let loadedPages = 0; // Contador para rastrear as páginas renderizadas

    // Função para renderizar cada página individualmente
    const renderPage = (pageNum) => {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 }); // Define o tamanho
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            page.render({ canvasContext: context, viewport }).promise.then(() => {
                const pageDiv = document.createElement('div'); // Contêiner da página
                pageDiv.className = 'page'; // Classe para Turn.js
                pageDiv.appendChild(canvas); // Adiciona o canvas à página
                flipbook.appendChild(pageDiv); // Adiciona a página ao flipbook

                loadedPages++;

                // Inicializa o Turn.js quando todas as páginas forem carregadas
                if (loadedPages === totalPages) {
                    $('#flipbook').turn({
                        width: 800,
                        height: 600,
                        autoCenter: true,
                    });
                }
            });
        });
    };

    // Renderiza todas as páginas do PDF
    for (let i = 1; i <= totalPages; i++) {
        renderPage(i);
    }
});
