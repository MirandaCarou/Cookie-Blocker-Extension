var installed = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ){
    installed[tabId] = "yes";
    if (installed[tabId] === undefined) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content-script.js"]
      });
    }
});

