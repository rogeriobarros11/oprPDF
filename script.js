const url = './your.pdf'; // Caminho do PDF
const flipbook = document.getElementById('flipbook');

// Configuração do PDF.js
const loadingTask = pdfjsLib.getDocument(url);

loadingTask.promise.then(pdf => {
    const totalPages = pdf.numPages;
    const pages = []; // Array para armazenar as imagens das páginas

    // Carrega todas as páginas
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 2 }); // Define o tamanho da página
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            page.render({
                canvasContext: context,
                viewport: viewport
            }).promise.then(() => {
                pages.push(canvas); // Adiciona o canvas ao array

                // Se todas as páginas foram carregadas
                if (pages.length === totalPages) {
                    createFlipbook(pages); // Chama a função para criar o flipbook
                }
            });
        });
    }
});

// Função para criar o efeito flipbook usando Turn.js
function createFlipbook(pages) {
    pages.forEach(pageCanvas => {
        const pageDiv = document.createElement('div');
        pageDiv.classList.add('page'); // Adiciona uma classe para estilização
        pageDiv.appendChild(pageCanvas); // Adiciona o canvas ao flipbook
        flipbook.appendChild(pageDiv); // Adiciona a página ao contêiner principal
    });

    // Ativa o Turn.js no contêiner flipbook
    $('#flipbook').turn({
        width: 800, // Largura do flipbook
        height: 600, // Altura do flipbook
        autoCenter: true,
    });
}
