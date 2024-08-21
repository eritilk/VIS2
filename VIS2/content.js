function applyFilter(filterName) {
    // Remove any existing overlay
    const existingOverlay = document.getElementById('visualImpairmentOverlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
  
    // Remove any existing filter
    document.body.style.filter = '';
  
    // Apply the selected filter
    switch (filterName) {
      case 'blindness':
        document.body.style.filter = 'brightness(0%)';
        break;
      case 'lowVision':
        document.body.style.filter = 'blur(5px) brightness(50%)';
        break;
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
        document.body.style.filter = `url(#${filterName})`;
        break;
      case 'achromatopsia':
        document.body.style.filter = 'grayscale(100%)';
        break;
      case 'cataracts':
        document.body.style.filter = 'blur(3px) brightness(70%)';
        break;
      case 'glaucoma':
        document.body.style.filter = 'blur(5px)';
        break;
      case 'amd':
        document.body.style.filter = 'brightness(50%) contrast(50%)';
        break;
      case 'diabeticRetinopathy':
        // Add an overlay with a background image for diabetic retinopathy
        const overlay = document.createElement('img');
        overlay.id = 'visualImpairmentOverlay';
        overlay.src = chrome.runtime.getURL('images/diabetic_retinopathy.png');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '2147483647'; // Ensure it appears on top
        document.body.appendChild(overlay);
        break;
      case 'reset':
        document.body.style.filter = 'none';
        break;
      default:
        document.body.style.filter = 'none';
    }
  }
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'applyFilter') {
      applyFilter(message.filterName);
    }
  });
  