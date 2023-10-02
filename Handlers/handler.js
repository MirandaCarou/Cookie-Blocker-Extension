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
}





  
    

  