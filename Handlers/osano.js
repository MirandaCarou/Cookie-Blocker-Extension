class Osano extends Handler{
    constructor(){
        super();
        this.hostName = 'Osano';
        this.rootName = 'osano-cm-window';
        this.acceptAllId = 'osano-cm-accept-all osano-cm-buttons__button osano-cm-button osano-cm-button--type_accept';
        this.denyAllId = 'osano-cm-denyAll osano-cm-buttons__button osano-cm-button osano-cm-button--type_denyAll';
        this.savePreferences = 'osano-cm-save osano-cm-buttons__button osano-cm-button osano-cm-button--type_save';
    }

    getRootName(){
        return this.rootName;
    }
    getHostName(){
        return this.hostName;
    }
    canHandlerSite(){
        if(document.getElementsByClassName(this.rootName)[0]){
          document.getElementsByClassName(this.rootName)[0].style.display = "none";
          document.getElementsByClassName(this.rootName)[0].style.visibility = "hidden";
          return true;
        }else{
          return false;
        }
    }
    manageSiteAsAcceptAll(){
      this.clickElementWithClassName([this.acceptAllId]);
      console.log('Se han aeptado todas las cookies'); 
    }
    manageSiteAsDenyAll(){
      if(document.getElementsByClassName( this.denyAllId)[0]){
        console.log('Se quieren rechazar todas las cookies sin configurar');
        this.clickElementWithClassName([this.denyAllId]);
      }else{
        console.log('Se van a ir a configurar las cookies');
        this.clickElementWithClassName([this.savePreferences]);
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
            console.error("Error:", error);
          });
        }
          
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