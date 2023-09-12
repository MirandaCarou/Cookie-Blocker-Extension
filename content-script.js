//----------------- DEFINICIÓN DE CONSTANTES (PENDIENTES DE USAR PARA OPTIMIZAR EL CÓDIGO) ---------------------------
const ONETRUST_HOST_NAME = "onetrust";
const ONETRUST_ROOT_HOST = 'onetrust-consent-sdk';
const ONETRUST_ACCPETALL = 'onetrust-accept-btn-handler';
const ONETRUST_DENYALL = 'onetrust-reject-all-handler';
const ONETRUST_CONFIGURATE = 'onetrust-pc-btn-handler';
const ONETRUST_SAVE_PREFERENCES = 'save-preference-btn-handler onetrust-close-btn-handler';


const DIDOMI_HOST_NAME = "didomi";
const DIDOMI_ROOT_HOST = 'didomi-host';
const DIDOMI_ACCEPT_ALL  = 'didomi-notice-agree-button';
const DIDOMI_CONFIGURATE  = 'didomi-notice-learn-more-button';
const DIDOMI_SAVE_PREFERENCES = 'didomi-components-button didomi-button didomi-button-standard standard-button';

//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
async function waitForElementById(elementId) {
  console.log(`Esperando el elemento con el ID '${elementId}'`);
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutationsList) => {
      const targetElement = document.getElementById(elementId);
      console.log(targetElement);
      if (targetElement) {
        observer.disconnect();
        console.log(`Se encontró el elemento con el ID '${elementId}'`);
        resolve(targetElement);
      } else {
        console.log(`Aún se está esperando el elemento con el ID '${elementId}'`);
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  });
}
async function waitForElementByClass(elementClass) {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutationsList) => {
      const targetElement = document.getElementsByClassName(elementClass);
      if (targetElement) {
        observer.disconnect();
        resolve(targetElement);
      } else {
        console.log(`Aún se está esperando el elemento con la clase '${elementId}'`);
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  });
}

async function waitForElementsById(elementIds) {
  console.log('vamos a entrar en la promesa de esperar por el id');
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          for (const elementId of elementIds) {
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
              observer.disconnect();
              resolve();
            }else{
              console.log('Se esta esperando');
            }
          }
        }
      });
  
      observer.observe(document, { childList: true, subtree: true });
    });
  }

  async function waitForElementsByClass(elementClasses) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          for (const elementClass of elementClasses) {
            const targetElements = document.getElementsByClassName(elementClass);
            if (targetElements) {
              observer.disconnect();
              resolve();
            }else{
              console.log('Se esta esperando');
            }
          }
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    });
  }

function clickElementWithId(id) {
  if(document.getElementById(id)){
    document.getElementById(id).click();
  }else{
    waitForElementById(id)
    .then(() => {
      document.getElementById(id).click();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
}
function clickElementWithClassName(className) {
  if(document.getElementsByClassName(className)[0] !== undefined && document.getElementsByClassName(className)[0] != null){
    console.log(document.getElementsByClassName(className)[0].click());
    document.getElementsByClassName(className)[0].click();
  }else{
    waitForElementByClass(className)
    .then(() => {
      document.getElementsByClassName(className)[0].click();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
    
}

//-------------- FUNCIONES DE LA EXTENSIÓN Y RELACIONADAS CON SU COMPORTAMIENTO --------------------------------------------
async function checkConfigurationOptions(privacyApli){
        switch(privacyApli) {
            case "didomi":
              if(document.getElementsByClassName('didomi-components-button didomi-button didomi-button-standard standard-button') !== undefined){
                console.log(document.getElementsByClassName('didomi-components-button didomi-button didomi-button-standard standard-button')[0]);
                clickElementWithClassName(['didomi-components-button didomi-button didomi-button-standard standard-button']);
                
              } 
              break;
            case "onetrust":
                if(document.getElementsByClassName('save-preference-btn-handler onetrust-close-btn-handler') !== undefined){
                    console.log('save-preference-btn-handler onetrust-close-btn-handler');
                    setTimeout(() => {
                      clickElementWithClassName(['save-preference-btn-handler onetrust-close-btn-handler']);
                    }, 1000);
                    console.log("Se le ha dado al boton de guardar preferencias");
                }
                break;
            default:
                break;
        }
        
}
async function configurateCookies(privacyApli) {
    switch (privacyApli) {
        case "didomi":
            if(preferences == "acceptAll" ){
                clickElementWithId(['didomi-notice-agree-button']);
                console.log('Se han aeptado todas las cookies'); 
            }else if(preferences == "denyAll"){
                clickElementWithId(['didomi-notice-learn-more-button']);
                setTimeout(() => {
                  checkConfigurationOptions(privacyApli);
                }, 1000);   
            }
            break;
        case "onetrust":
            if(preferences == "acceptAll"){
                console.log('Se quieren aceptar todas las cookies'); 
                clickElementWithId(["onetrust-accept-btn-handler"]);
            }else if(preferences == "denyAll"){
              if(document.getElementById('onetrust-reject-all-handler')){
                console.log('Se quieren rechazar todas las cookies sin configurar');
                clickElementWithId(['onetrust-reject-all-handler']);
              }else{
                console.log('Se van a ir a configurar las cookies');
                clickElementWithId(['onetrust-pc-btn-handler']);
                await checkConfigurationOptions(privacyApli);

              }
            }
            break;    
        default:
            break;
    }
    
}
async function checkForCookiePrefencesElement(preferences) {
    if (document.getElementById('didomi-host')) {
      console.log('Se ha detectado el uso de el gestor de privacidad DIDOMI');  
      await configurateCookies("didomi",preferences);
    }else if(document.getElementById('onetrust-consent-sdk')){
      console.log('Se ha detectado el uso de el gestor de privacidad ONETRUST');  
      await configurateCookies("onetrust",preferences);  
    }else{

    }
}


var preferences = "";
async function checkForCookiePreferences(){
    chrome.storage.sync.get("accepted", async function (data) {
        console.log("Value currently is " + data.accepted);
        preferences = data.accepted;
        console.log("The preference value is "+ preferences);
        await checkForCookiePrefencesElement(preferences);
    });
  }

//------------------------ INICIO ----------------------------------------------------------------
waitForElementsById(['didomi-host', 'onetrust-consent-sdk'])
    .then(async () => {
      console.log("Los elementos han aparecido. Ejecutando comandos...");
      await checkForCookiePreferences();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

   

      