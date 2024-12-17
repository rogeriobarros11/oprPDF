<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipbook com WowBook.js</title>
    <!-- Estilo do WowBook.js -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/wowbook/1.3.0/wowbook.css">
    <!-- CSS adicional opcional -->
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <!-- Contêiner do Flipbook -->
    <div id="flipbook" style="width: 800px; height: 600px; margin: auto;"></div>

    <!-- Bibliotecas necessárias -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wowbook/1.3.0/wowbook.min.js"></script>

    <!-- Script para inicializar o WowBook.js -->
    <script>
        $(document).ready(function () {
            $("#flipbook").wowBook({
                pdf: "your.pdf", // Substitua pelo caminho correto do seu PDF
                width: 800, // Largura do flipbook
                height: 600, // Altura do flipbook
                centeredWhenClosed: true,
                hardcovers: true,
                flipSound: true, // Som ao virar páginas
                zoomStep: 0.3, // Permite zoom
                pdfFind: true, // Ativa busca no PDF
                toolbar: "last-first, zoomin, zoomout, slideshow, find, fullscreen",
                onLoad: function () {
                    console.log("Flipbook carregado com sucesso!");
                }
            });
        });
    </script>
</body>
</html>
