class CookieYes extends Handler{
    constructor(){
        super();
        this.hostName = 'cookieYes';
        this.rootName = 'cky-consent-container';
        this.acceptAllId = 'cky-btn cky-btn-accept';
        this.denyAllId = 'cky-btn cky-btn-reject';
        this.configuration = 'cky-btn cky-btn-customize';
        this.savePreferences = 'cky-btn cky-btn-preferences';
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
        this.clickElementWithClassName([this.configuration]);
        this.checkConfigurationOptions();
      }
    }

}