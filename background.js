var installed = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ){
    if (installed[tabId] === undefined) {
      installed[tabId] = "yes";
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content-script.js"]
      });
    }
});

