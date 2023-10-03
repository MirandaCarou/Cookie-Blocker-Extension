

//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
async function waitForElementById(elementId) {
  console.log(`Esperando el elemento con el ID '${elementId}'`);
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
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
    const observer = new MutationObserver(() => {
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
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
          for (const elementId of elementIds) {
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
              observer.disconnect();
              resolve();
            }
          }
      });
  
      observer.observe(document, { childList: true, subtree: true });
    });
  }

  async function waitForElementsByClass(elementClasses) {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
          for (const elementClass of elementClasses) {
            const targetElements = document.getElementsByClassName(elementClass);
            if (targetElements) {
              observer.disconnect();
              resolve();
            }else{
              console.log('Se esta esperando');
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

//-------------- FUNCIONES DE LA EXTENSIÓN Y RELACIONADAS CON SU COMPORTAMIENTO ---------------------------------------------------------------
async function configurateCookies(handler, preferences) {
  console.log("-------------CONFIGURATE COOKIES --------------");
  console.log(handler.getHostName());
  console.log(preferences);
  console.log("-----------------------------------------------");
  if(preferences == 'acceptAll'){
      handler.manageSiteAsAcceptAll();
  }else if (preferences == "denyAll") {
      handler.manageSiteAsDenyAll();
  }

}

async function getCookiePreferences(){
    chrome.storage.sync.get("accepted", async function (data) {
        console.log("The preference value is "+ data.accepted);
        preferences = data.accepted;
    });
}


function getHandlerData(){
  handlersArray.forEach(element => {
    if(element.canHandlerSite()){
      handler = element;
    }
  });
}

async function runAplication(){
  waitForElementsById(handlersRootNames)
  .then(async () => {
    chrome.storage.sync.get("accepted", async function (data) {
      preferences = data.accepted;
      getHandlerData();
      await configurateCookies(handler,preferences);
    });
  })
  .catch((error) => {
      console.error("Error:", error);
  });

  
  
}
//------------------------ INICIO ----------------------------------------------------------------
var handler = new Handler();
var handlerSetUp = new SetUp();
var handlersArray = handlerSetUp.getAllHandlers();
var handlersRootNames = handlerSetUp.getAllRootNames();
var preferences = "";

runAplication();
//ESTABAS APUNTO DE LLEVAR LA LOGICA DE ACCEPTAR TODO Y RECHAZAR TODO EN EL HANDLER 
//AÑADIEDNO LOS WAITS Y LOS CLICK MIRA ESO



   

      