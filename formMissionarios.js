function validateFileTypeAndDimensions(validWidth, validHeight, inputFileId) {
    const selectedFile = document.getElementById(inputFileId).files[0];
    
    if (!selectedFile) {
        return false;
    }
    
    const allowedTypes = ['image/png'];

    if (!allowedTypes.includes(selectedFile.type)) {
        alert('Extensão de arquivo inválida. Por favor escolha um arquivo com extensão PNG.');
        document.getElementById(inputFileId).value = '';
        return false;
    }

    return new Promise((resolve) => {
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
                    resolve(false);
                } else {
                    resolve(true);
                }
            };
        };
    });
}


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
  const hexColor = document.getElementById('hexColor');
  const colorPreviewBox = document.getElementById('colorPreviewBox');
  
  // Initialize with default color
  const defaultColor = '#';
  hexColor.value = defaultColor;
  colorPreviewBox.style.backgroundColor = defaultColor;
  
  // Update color preview when hex input changes
  hexColor.addEventListener('input', function() {
    let value = hexColor.value;
    
    // Make sure it starts with #
    if (!value.startsWith('#')) {
      value = '#' + value;
      hexColor.value = value;
    }
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      colorPreviewBox.style.backgroundColor = value;
    }
  });
  
  // Ensure # is added when focus is gained if missing
  hexColor.addEventListener('focus', function() {
    if (!hexColor.value.startsWith('#')) {
      hexColor.value = '#' + hexColor.value;
    }
  });
});

// Form submission with Bearer authentication
document.addEventListener('DOMContentLoaded', function() {
  const missionForm = document.getElementById('missionForm');
  
  missionForm.addEventListener('submit', async function(e) {
    console.log('Form submission initiated'); // Debug log
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event bubbling
    console.log('Form submission event stopped'); // Debug log
    
    console.log('Form submission intercepted'); // Debug log
    
    // Validate all file inputs before submission
    const fileInputs = [
      { id: 'memberImg1', width: 400, height: 400, required: true },
      { id: 'profileImg1', width: 200, height: 200, required: true },
      { id: 'memberImg2', width: 400, height: 400, required: true },
      { id: 'profileImg2', width: 200, height: 200, required: false },
      { id: 'missionInform', width: 300, height: 300, required: true },
      { id: 'selectedMission', width: 800, height: 200, required: true }
    ];
    
    // Check if all required files are present and valid
    for (const fileInput of fileInputs) {
      const element = document.getElementById(fileInput.id);
      if (fileInput.required && !element.files[0]) {
        alert(`Por favor, selecione um arquivo para: ${element.previousElementSibling.textContent}`);
        return false;
      }
      
      if (element.files[0]) {
        const isValid = await validateFileTypeAndDimensions(fileInput.width, fileInput.height, fileInput.id);
        if (!isValid) {
          console.log(`File validation failed for ${fileInput.id}`);
          return false;
        }
      }
    }
    
    const formData = new FormData(this);
    const serverUrl = document.getElementById('serverUrl').value;
    const authToken = document.getElementById('authToken').value;
    
    if (!authToken.trim()) {
      alert('Por favor, insira o token de autenticação.');
      return false;
    }
    
    // Show loading state
    const submitButton = document.getElementById('submeterFormulario');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });
      
      if (response.ok) {
        alert('Formulário enviado com sucesso!');
        this.reset(); // Reset form on success
        
        // Reset color picker to default
        const hexColor = document.getElementById('hexColor');
        const colorPreviewBox = document.getElementById('colorPreviewBox');
        const defaultColor = '#';
        hexColor.value = defaultColor;
        colorPreviewBox.style.backgroundColor = defaultColor;
      } else {
        const errorText = await response.text();
        alert(`Erro ao enviar formulário: ${response.status} - ${response.statusText}\n${errorText}`);
      }
    } catch (error) {
      alert(`Erro de conexão: ${error.message}`);
    } finally {
      // Restore button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
    
    return false; // Ensure form doesn't submit through default behavior
  });
});

// Server URL selector functionality
document.addEventListener('DOMContentLoaded', function() {
  const serverUrlSelector = document.getElementById('serverUrl');
  
  // Log URL changes for debugging
  serverUrlSelector.addEventListener('change', function() {
    console.log('Server URL changed to:', this.value);
  });
});



