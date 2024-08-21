document.getElementById('applyFilter').addEventListener('click', () => {
    const selectedImpairment = document.getElementById('impairmentSelect').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (filterName) => {
          chrome.runtime.sendMessage({ action: 'applyFilter', filterName });
        },
        args: [selectedImpairment]
      });
    });
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          chrome.runtime.sendMessage({ action: 'applyFilter', filterName: 'reset' });
        }
      });
    });
  });
  