class Handler {

    constructor(){ 
        this.hostName = "default";
        this.rootName = "default";
        this.acceptAllId = "default";
        this.denyAllId = "default";
        this.configuration = "default"
        this.savePreferences = "default";
    }
    
    getRootName(){
        return this.rootName;
    }
    getHostName(){
        return this.hostName;
    }
    canHandlerSite(){
        if(document.getElementById(this.rootName)){
            return true;
        }else{
            return false;
        }
    }
    manageSiteAsAcceptAll(){
      clickElementWithId([this.acceptAllId]);
      console.log('Se han aeptado todas las cookies'); 
    }
    manageSiteAsDenyAll(){
      if(document.getElementById( this.denyAllId)){
        console.log('Se quieren rechazar todas las cookies sin configurar');
        clickElementWithId([this.denyAllId]);
      }else{
        console.log('Se van a ir a configurar las cookies');
        clickElementWithId([this.configuration]);
        this.checkConfigurationOptions();
      }
    }
    checkConfigurationOptions(){

      if(document.getElementsByClassName(this.savePreferences) !== undefined){
        console.log(document.getElementsByClassName(this.savePreferences)[0]);
        setTimeout(() => {
        clickElementWithClassName([this.savePreferences]);
        }, 1000);
        console.log("Se le ha dado al boton de guardar preferencias");
      } 
      
    }
    clickElementWithId(id) {
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
    clickElementWithClassName(className) {
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
    waitForElementsById(elementIds) {
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
    
     waitForElementsByClass(elementClasses) {
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
}





  
    

  