

//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
async function waitForElementsByIdorClassName(elements) {
    return new Promise(async (resolve, reject) => {
      const observer = new MutationObserver(() => {
          for (const element of elements) {
            const targetElement = document.getElementById(element) ?? document.getElementsByClassName(element)[0];
            if (targetElement != undefined) {
              observer.disconnect();
              elementDetected = true;
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

function getHandlerData(){
  var found = false;
  handlersArray.forEach(element => {
    if(!found && element.canHandlerSite()){
      handler = element;
      found = true;
    }
  });
}

async function runAplication(){
  handlerSetUp = new SetUp();
  handlersArray = handlerSetUp.getAllHandlers();
  handlersRootNames = handlerSetUp.getAllRootNames();
  handler = new Handler();
  waitForElementsByIdorClassName(handlersRootNames)
  .then(async () => {
    chrome.storage.sync.get("accepted", async function (data) {
      preferences = data.accepted;
      getHandlerData();
      await configurateCookies(handler,preferences);
    });
  })
  .catch((error) => {
      runAplication();
  });

  
  
}
//------------------------ INICIO ----------------------------------------------------------------


runAplication();



   

      