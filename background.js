chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.status === 'complete') {
    // Ejecutamos el script en la página usando la API chrome.scripting.executeScript
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: checkForDidomiHostElement
    });
  }
});


// Esta función se ejecutará en el contexto de la página web
function checkForDidomiHostElement() {
  // Verificamos si la página contiene un elemento con el ID "didomi-host"
  if (document.getElementById('didomi-host')) {
    console.log('La página contiene un elemento con el ID "didomi-host"');
    console.log(document.getElementById('didomi-host'));
    console.log(document.getElementById('didomi-popup'));
    if(document.getElementById('didomi-popup')){
      console.log('La página puede contener un popup en el medio"');
    }else if(document.getElementById('didomi-notice')){
      console.log('La página puede contener un popup arriba o abajo');
    }
    console.log('AHHHH');
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: checkExistModal
    });
  }
}
function checkExistModal() {
    console.log('AAAAAAAAAAAAAAAA');
}