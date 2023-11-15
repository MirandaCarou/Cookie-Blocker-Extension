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
    }
    manageSiteAsDenyAll(){
      if(document.getElementsByClassName( this.denyAllId)[0]){
        this.clickElementWithClassName([this.denyAllId]);
      }else{
        this.clickElementWithClassName([this.savePreferences]);
      }
    }
}