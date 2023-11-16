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
          document.getElementById(this.rootName).style.display = "none";
          document.getElementById(this.rootName).style.visibility = "hidden";
          return true;
        }else{
          return false;
        }
    }
    manageSiteAsAcceptAll(){
      this.clickElementWithId([this.acceptAllId]);
    }
    manageSiteAsDenyAll(){
      if(document.getElementById( this.denyAllId)){
        this.clickElementWithId([this.denyAllId]);
      }else{
        this.clickElementWithId([this.configuration]);
        this.checkConfigurationOptions();
      }
    }
    checkConfigurationOptions(){

      if(document.getElementsByClassName(this.savePreferences) !== undefined){
        setTimeout(() => {
        this.clickElementWithClassName([this.savePreferences]);
        }, 1000);
      } 
      
    }
    clickElementWithId(id) {
        if(document.getElementById(id)){
          document.getElementById(id).click();
        }else{
          this.waitForElementsById(id)
          .then(() => {
            document.getElementById(id).click();
          })
          .catch((error) => {
            console.error("Error clicking in the element:", error);
          });
        }
      }
    clickElementWithClassName(className) {
        if(document.getElementsByClassName(className)[0] !== undefined && document.getElementsByClassName(className)[0] != null){
          document.getElementsByClassName(className)[0].click();
        }else{
          this.waitForElementsByClass(className)
          .then(() => {
            document.getElementsByClassName(className)[0].click();
          })
          .catch((error) => {
            console.error("Error clicking in the element:", error);
          });
        }
          
    }
    waitForElementsById(elementIds) {
      return new Promise( (resolve, reject) => {
        var elementDetected = false;
        for (const element of elementIds) {
          const targetElement = document.getElementById(element);
          if (targetElement != undefined) {
            elementDetected = true;
            resolve();
          }
        }
        if (!elementDetected) {
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
        }
      });
    }
    
    waitForElementsByClass(elementClasses) {
      return new Promise( (resolve, reject) => {
        var elementDetected = false;
        for (const element of elementClasses) {
          const targetElement = document.getElementsByClassName(element)[0];
          if (targetElement != undefined) {
            elementDetected = true;
            resolve();
          }
        }
        if (!elementDetected) {
          const observer = new MutationObserver(() => {
              for (const elementClass of elementClasses) {
                const targetElements = document.getElementsByClassName(elementClass)[0];
                if (targetElements) {
                  observer.disconnect();
                  resolve();
                }
              }
          });
          observer.observe(document, { childList: true, subtree: true });
        }
      });
    }
}





  
    

  