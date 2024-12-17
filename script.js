<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipbook PDF</title>
    <style>
        body {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #f8f8f8;
            height: 100vh;
            overflow: hidden;
        }

        #flipbook {
            width: 90vw;
            max-width: 800px;
            height: calc(90vw * 0.75);
            max-height: 600px;
            margin: auto;
        }

        .page {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
        }
    </style>
</head>
<body>
    <!-- Contêiner do Flipbook -->
    <div id="flipbook"></div>

    <!-- Bibliotecas -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/turn.js/4.1.0/turn.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

    <script>
        const pdfURL = "your.pdf"; // Substitua pelo caminho correto do seu PDF
        const flipbook = document.getElementById("flipbook");

        // Configuração do PDF.js Worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

        const loadPDF = async () => {
            const pdf = await pdfjsLib.getDocument(pdfURL).promise;
            const totalPages = pdf.numPages;

            // Renderizar todas as páginas do PDF
            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });

                // Criar canvas para a página
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Renderizar a página no canvas
                await page.render({ canvasContext: context, viewport }).promise;

                // Adicionar página ao Flipbook
                const pageDiv = document.createElement("div");
                pageDiv.className = "page";
                pageDiv.appendChild(canvas);
                flipbook.appendChild(pageDiv);
            }

            // Inicializar o Flipbook
            $("#flipbook").turn({
                width: flipbook.offsetWidth,
                height: flipbook.offsetHeight,
                autoCenter: true,
                display: "double",
            });
        };

        loadPDF();
    </script>
</body>
</html>
