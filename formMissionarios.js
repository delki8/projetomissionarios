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
            }
        };
    };
}


document.getElementById("colorPicker").addEventListener("input", function() {
    document.getElementById("colorValue").textContent = this.value;
});


     
