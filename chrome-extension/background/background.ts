// Background service worker for the extension
// Handles installation and updates

chrome.runtime.onInstalled.addListener(() => {
  console.log('Trading Metrics Overlay installed');
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_DATA') {
    // Future: Fetch real-time data from API
    sendResponse({ success: true, data: {} });
  }
  return true;
});

// Keyboard command listener
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-overlay') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_OVERLAY' });
      }
    });
  }
});
