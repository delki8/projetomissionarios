function validateFileTypeAndDimensions(validWidth, validHeight, inputFileId) {
         const selectedFile = document.getElementById(inputFileId).files[0];
         const allowedTypes = ['image/png'];

         if (!allowedTypes.includes(selectedFile.type)) {
            alert('Extensão de arquivo inválida. Por favor escolha um arquivo com extensão PNG.');
             document.getElementById(inputFileId).value = '';
	     return;
         }
 
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function() {
	    const width = image.width;
	    const height = image.height;
           
            if (!(width === validWidth && height === validHeight)) {
                alert(`A largura e a altura devem ser de ${validWidth}x${validHeight} px. Este arquivo está fora dessas dimensões.`);
                document.getElementById(inputFileId).value = '';
            } else {
		alert("Arquivo carregado com sucesso.");
	    }
        };
    };
}


document.getElementById("colorPicker").addEventListener("input", function() {
    document.getElementById("colorValue").textContent = this.value;
});


     

/*

     
document.getElementById('fileInput').addEventListener('change', function() {
    const fileUpload = document.getElementById('fileInput');
    const file = fileUpload.files[0];

    if (file) {
	const reader = new FileReader();

	// Leitura do conteúdo do arquivo como Data URL.
	reader.readAsDataURL(file);
	reader.onload = function (e) {
	    const image = new Image();

	    // Definir a fonte da imagem para a URL codificada em base64.
	    image.src = e.target.result;

	    // Validação das dimensões da imagem.
	    image.onload = function () {
		const height = this.height;
		const width = this.width;
		if (!(height === 800 && width === 800)) {
		    alert("O arquivo foi carregado com sucesso mas a Altura e a Largura devem de 800px. Este arquivo está fora dessas dimensões.");
		    return false;
		    document.getElementById('fileInput').value = ''
		}
		// alert("Uploaded image has valid Height and Width.");
		// return true;
	    };
	};
    }
});

*/
