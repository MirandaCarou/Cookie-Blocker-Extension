

//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
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



   

      