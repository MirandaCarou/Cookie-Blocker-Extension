chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.status === 'complete') {
    // Ejecutamos el script en la página usando la API chrome.scripting.executeScript
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content-script.js']
    });
  }
});
var option = "denyAll";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("BACKGROUND.JS");
  sendResponse(option);
});






