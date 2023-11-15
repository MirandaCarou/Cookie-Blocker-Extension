class CookieNotice extends Handler{
    constructor(){
        super();
        this.hostName = 'cookieNotce';
        this.rootName = 'cookie-notice';
        this.acceptAllId = 'cn-accept-cookie';
        this.denyAllId = 'cn-refuse-cookies';
    }
    manageSiteAsDenyAll(){
        if(document.getElementById( this.denyAllId)){
          this.clickElementWithId([this.denyAllId]);
        }else{
          this.clickElementWithId([this.acceptAllId]);
          this.checkConfigurationOptions();
        }
    }
    
}
