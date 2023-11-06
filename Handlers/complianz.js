class Complianz extends Handler{
    constructor(){
        super();
        this.hostName = 'Complianz';
        this.rootName = 'cmplz-cookiebanner-container';
        this.acceptAllId = 'cmplz-btn cmplz-accept';
        this.denyAllId = 'cmplz-btn cmplz-deny';
        this.savePreferences = 'cmplz-btn cmplz-save-preferences';
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