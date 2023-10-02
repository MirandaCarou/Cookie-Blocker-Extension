class Handler {

    constructor(){ 
        this.hostName = "default";
        this.rootName = "default";
        this.acceptAllId = "default";
        this.denyAllId = "default";
        this.configurationClassName = "default"
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
    };
    manageSiteAsAcceptAll(){

    };
    manageSiteAsDenyAll(){

    };
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





  
    

  