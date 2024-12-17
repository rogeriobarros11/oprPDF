// URL do arquivo PDF
const url = './your.pdf'; // Substitua pelo nome do seu arquivo PDF no mesmo diretório.

// Variáveis para controlar o PDF
let pdfDoc = null, // Objeto do PDF carregado
    pageNum = 1, // Página atual
    pageIsRendering = false, // Status de renderização
    pageNumPending = null; // Fila para próxima página

const scale = 1.5; // Zoom do PDF (aumente para mais detalhes)
const canvas = document.getElementById('pdf-canvas'); // Canvas onde o PDF será renderizado
const ctx = canvas.getContext('2d'); // Contexto 2D do Canvas

// Função para renderizar uma página
const renderPage = (num) => {
    pageIsRendering = true; // Marca que uma página está sendo renderizada

    // Obtém a página do PDF
    pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale }); // Define o tamanho da página
        canvas.height = viewport.height; // Ajusta o tamanho do canvas
        canvas.width = viewport.width;

        // Configurações de renderização
        const renderContext = {
            canvasContext: ctx,
            viewport,
        };

        // Renderiza a página no canvas
        page.render(renderContext).promise.then(() => {
            pageIsRendering = false; // Finaliza a renderização
            if (pageNumPending !== null) {
                renderPage(pageNumPending); // Renderiza a página pendente
                pageNumPending = null;
            }
        });

        // Atualiza a informação da página atual
        document.getElementById('current-page').textContent = num;
    });
};

// Fila para renderizar uma nova página
const queueRenderPage = (num) => {
    if (pageIsRendering) {
        pageNumPending = num; // Adiciona à fila se outra página estiver sendo renderizada
    } else {
        renderPage(num); // Renderiza imediatamente
    }
};

// Função para a página anterior
document.getElementById('prev-page').addEventListener('click', () => {
    if (pageNum <= 1) return; // Impede retroceder da primeira página
    pageNum--; // Reduz o número da página
    queueRenderPage(pageNum); // Renderiza a nova página
});

// Função para a próxima página
document.getElementById('next-page').addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return; // Impede avançar além da última página
    pageNum++; // Aumenta o número da página
    queueRenderPage(pageNum); // Renderiza a nova página
});

// Carrega o PDF
pdfjsLib.getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf; // Armazena o documento PDF
    document.getElementById('total-pages').textContent = pdf.numPages; // Atualiza o total de páginas
    renderPage(pageNum); // Renderiza a primeira página
}).catch((err) => {
    console.error('Erro ao carregar o PDF:', err); // Exibe erros no console
});
