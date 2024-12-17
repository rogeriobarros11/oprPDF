const url = './your.pdf'; // Caminho do seu arquivo PDF
const flipbook = document.getElementById('flipbook');

pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages; // Total de páginas no PDF
    let pagesLoaded = 0; // Contador de páginas carregadas

    // Itera pelas páginas do PDF
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 }); // Tamanho da página
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            page.render({ canvasContext: context, viewport }).promise.then(() => {
                // Cria um elemento de página para o Turn.js
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page'; // Classe para estilização
                pageDiv.appendChild(canvas); // Adiciona o canvas no contêiner
                flipbook.appendChild(pageDiv); // Adiciona a página ao flipbook

                pagesLoaded++;

                // Inicializa o Turn.js após carregar todas as páginas
                if (pagesLoaded === totalPages) {
                    $('#flipbook').turn({
                        width: 800,  // Largura do flipbook
                        height: 600, // Altura do flipbook
                        autoCenter: true,
                    });
                }
            });
        });
    }
});
