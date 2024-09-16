document.getElementById('combineButton').addEventListener('click', function() {
    const userImageInput = document.getElementById('userImage');
    const resultCanvas = document.getElementById('resultCanvas');
    const downloadLink = document.getElementById('downloadLink');

    if (userImageInput.files.length === 0) {
        alert('Por favor, envie a sua imagem.');
        return;
    }

    const userImage = new Image();
    const frameImage = new Image();

    // Caminho relativo da moldura
    frameImage.src = 'moldura.png';

    // Configura o canvas
    const canvasSize = 1080; // Tamanho padrão para fotos de perfil
    resultCanvas.width = canvasSize;
    resultCanvas.height = canvasSize;
    const ctx = resultCanvas.getContext('2d');

    // Função para desenhar a moldura após a imagem do usuário ser desenhada
    function drawFrame() {
        if (frameImage.complete) {
            console.log('Desenhando moldura no canvas');
            ctx.drawImage(frameImage, 0, 0, canvasSize, canvasSize);
            downloadLink.href = resultCanvas.toDataURL('image/png');
            console.log('Imagem combinada pronta para download');
        } else {
            frameImage.onload = drawFrame;
        }
    }

    // Função para desenhar a imagem do usuário e depois a moldura
    userImage.onload = function() {
        console.log('Imagem do usuário carregada');
        const userImageSize = Math.min(userImage.width, userImage.height);
        const xOffset = (userImage.width - userImageSize) / 2;
        const yOffset = (userImage.height - userImageSize) / 2;
        
        // Redimensiona e recorta a imagem do usuário para 1080x1080 pixels
        ctx.clearRect(0, 0, canvasSize, canvasSize); // Limpa o canvas
        ctx.drawImage(userImage, xOffset, yOffset, userImageSize, userImageSize, 0, 0, canvasSize, canvasSize);
        console.log('Imagem do usuário ajustada e desenhada no canvas');
        drawFrame(); // Chama a função para desenhar a moldura
    };

    userImage.onerror = function() {
        console.error('Falha ao carregar a imagem do usuário.');
        alert('Falha ao carregar a imagem do usuário.');
    };

    // Configura a imagem do usuário
    userImage.src = URL.createObjectURL(userImageInput.files[0]);
});
