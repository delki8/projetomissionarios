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

// Server URL selector functionality
document.addEventListener('DOMContentLoaded', function() {
  const serverUrlSelector = document.getElementById('serverUrl');
  const missionForm = document.getElementById('missionForm');
  
  // Update form action when server selection changes
  serverUrlSelector.addEventListener('change', function() {
    missionForm.action = this.value;
    console.log('Form submission URL updated to:', this.value);
  });
});

// Color picker functionality
document.addEventListener('DOMContentLoaded', function() {
  const colorPicker = document.getElementById('colorPicker');
  const hexColor = document.getElementById('hexColor');
  const colorValue = document.getElementById('colorValue');
  const colorPreviewBox = document.getElementById('colorPreviewBox');
  
  // Initialize hex input with color picker value
  hexColor.value = colorPicker.value;
  
  // Update color preview and hex input when color picker changes
  colorPicker.addEventListener('input', function() {
    const newColor = colorPicker.value;
    colorValue.textContent = newColor;
    hexColor.value = newColor;
    colorPreviewBox.style.backgroundColor = newColor;
  });
  
  // Update color picker and preview when hex input changes
  hexColor.addEventListener('input', function() {
    let value = hexColor.value;
    
    // Make sure it starts with #
    if (!value.startsWith('#')) {
      value = '#' + value;
      hexColor.value = value;
    }
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      colorPicker.value = value;
      colorValue.textContent = value;
      colorPreviewBox.style.backgroundColor = value;
    }
  });
  
  // Ensure # is added when focus is gained if missing
  hexColor.addEventListener('focus', function() {
    if (!hexColor.value.startsWith('#')) {
      hexColor.value = '#' + hexColor.value;
    }
  });
  
  // Initialize color preview
  colorPreviewBox.style.backgroundColor = colorPicker.value;
});

// Add this if validateFileTypeAndDimensions function doesn't already exist
function validateFileTypeAndDimensions(expectedWidth, expectedHeight, fieldId) {
  // Implementation would go here if it doesn't already exist
  // This is just a placeholder comment since the function was referenced in the HTML
}



