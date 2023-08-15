async function clickElementWithId(id) {
    waitForElementsById(id)
    .then(() => {
      document.getElementById(id).click();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function clickElementWithClassName(className) {
    waitForElementsByClass(className)
    .then(() => {
      document.getElementsByClassName(className)[0].click();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function checkConfigurationOptions(privacyApli){
    console.log("Se quieren rechazar todas las cookies");
        switch(privacyApli) {
            case "didomi":
                 clickElementWithClassName(['didomi-components-button didomi-button didomi-button-standard standard-button']);
                 clickElementWithClassName(['didomi-components-button didomi-button didomi-button-standard standard-button']);
                 clickElementWithClassName(['didomi-components-button didomi-button didomi-button-standard standard-button']);
                break;
            case "onetrust":
                if(document.getElementsByClassName('ot-pc-refuse-all-handler')){
                    clickElementWithClassName(['ot-pc-refuse-all-handler']);
                }
                if(document.getElementsByClassName('save-preference-btn-handler onetrust-close-btn-handler')){
                    clickElementWithClassName(['save-preference-btn-handler onetrust-close-btn-handler']);
                }
                break;
            default:
                break;
        }
        console.log("Se han rechazado todas las cookies");
}
function configurateCookies(privacyApli) {
    switch (privacyApli) {
        case "didomi":
            if(preferences == "acceptAll"){
                clickElementWithId(['didomi-notice-agree-button']);
                console.log('Se han aeptado todas las cookies'); 
            }else if(preferences == "denyAll"){
                clickElementWithId(['didomi-notice-learn-more-button']);
                checkConfigurationOptions(privacyApli);
            }
            break;
        case "onetrust":
            if(preferences == "acceptAll"){
                clickElementWithId(['onetrust-accept-btn-handler']);
                console.log('Se han aceptado todas las cookies'); 
            }else if(preferences == "denyAll"){
                clickElementWithId(['onetrust-pc-btn-handler']);
                checkConfigurationOptions(privacyApli);
            }
            break;    
        default:
            break;
    }
    
}
function checkForCookiePrefencesElement(preferences) {
    // Verificamos si la página contiene un elemento con el ID "didomi-host"
    if (document.getElementById('didomi-host')) {
      console.log('Se ha detectado el uso de el gestor de privacidad DIDOMI');  
      configurateCookies("didomi",preferences);
    }else if(document.getElementById('onetrust-consent-sdk')){
      console.log('Se ha detectado el uso de el gestor de privacidad ONETRUST');  
      configurateCookies("onetrust",preferences);  
    }else{

    }
}


var preferences = "";
function checkForCookiePreferences(){
    chrome.storage.sync.get("accepted", function (data) {
        console.log("Value currently is " + data.accepted);
        preferences = data.accepted;
        console.log("The preference value is "+ preferences);
        checkForCookiePrefencesElement(preferences);
    });
    
}
function waitForElementsById(elementIds) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          for (const elementId of elementIds) {
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
              observer.disconnect();
              resolve();
            }
          }
        }
      });
  
      observer.observe(document, { childList: true, subtree: true });
    });
  }

  function waitForElementsByClass(elementClasses) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          for (const elementClass of elementClasses) {
            const targetElements = document.getElementsByClassName(elementClass);
            if (targetElements.length > 0) {
              observer.disconnect();
              resolve();
            }
          }
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    });
  }
  
  
  waitForElementsById(['didomi-host', 'onetrust-consent-sdk'])
    .then(() => {
      console.log("Los elementos han aparecido. Ejecutando comandos...");
      checkForCookiePreferences();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    



  