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
    }
    manageSiteAsDenyAll(){
      if(document.getElementsByClassName( this.denyAllId)[0]){
        this.clickElementWithClassName([this.denyAllId]);
      }else{
        this.clickElementWithClassName([this.savePreferences]);
      }
    }
}