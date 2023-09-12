chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content-script.js']
    });
  }
});

// Esto se utiliza para identificar que opcion a elegido el usuario (AcceptAll o DenyAll)
var option = "denyAll";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("BACKGROUND.JS");
  sendResponse(option);
});






