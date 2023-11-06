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
          console.log('Se quieren rechazar todas las cookies sin configurar');
          this.clickElementWithId([this.denyAllId]);
        }else{
          console.log('No se ha encontrado opcion posible a rechzar. Procedemos a Aceptar');
          this.clickElementWithId([this.acceptAllId]);
          this.checkConfigurationOptions();
        }
    }
    
}
