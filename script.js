const url = './your.pdf'; // Substitua com o caminho correto do seu PDF

const flipbook = document.getElementById('flipbook'); // Contêiner do flipbook

// Carregar o PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages;
    const pageImages = []; // Array para armazenar as imagens

    // Função para renderizar cada página como imagem
    const renderPageAsImage = (pageNum) => {
        return pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Renderiza a página no canvas
            return page.render({ canvasContext: context, viewport }).promise.then(() => {
                const image = document.createElement('img');
                image.src = canvas.toDataURL('image/png'); // Converte o canvas para uma imagem
                return image;
            });
        });
    };

    // Renderiza todas as páginas
    const renderAllPages = async () => {
        for (let i = 1; i <= totalPages; i++) {
            const img = await renderPageAsImage(i);
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.appendChild(img);
            flipbook.appendChild(pageDiv);
        }

        // Inicializa o Turn.js após adicionar todas as páginas
        $('#flipbook').turn({
            width: 800,
            height: 600,
            autoCenter: true,
        });
    };

    renderAllPages();
}).catch(err => console.error('Erro ao carregar o PDF:', err));
