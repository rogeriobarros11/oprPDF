const url = './your.pdf'; // Substitua com o caminho correto do PDF

// Configuração do workerSrc necessário para o PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Contêiner principal do flipbook
const flipbook = document.getElementById('flipbook');

// Carregar o PDF usando PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages; // Total de páginas no PDF
    let pagesLoaded = 0; // Contador para saber quando todas as páginas foram carregadas

    // Função para renderizar uma página do PDF
    const renderPage = (pageNum) => {
        return pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 }); // Tamanho da página
            const canvas = document.createElement('canvas'); // Elemento canvas
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Renderiza a página no canvas
            return page.render({ canvasContext: context, viewport }).promise.then(() => {
                const pageDiv = document.createElement('div'); // Container da página
                pageDiv.className = 'page';
                pageDiv.appendChild(canvas);
                flipbook.appendChild(pageDiv); // Adiciona a página ao flipbook
            });
        });
    };

    // Renderiza todas as páginas sequencialmente
    const renderAllPages = async () => {
        for (let i = 1; i <= totalPages; i++) {
            await renderPage(i); // Espera renderizar cada página antes de prosseguir
        }

        // Inicializa o Turn.js somente após todas as páginas terem sido renderizadas
        $('#flipbook').turn({
            width: 800, // Largura do flipbook
            height: 600, // Altura do flipbook
            autoCenter: true,
            duration: 800
        });
    };

    renderAllPages(); // Chama a função para renderizar todas as páginas
}).catch(error => {
    console.error('Erro ao carregar o PDF:', error);
});
