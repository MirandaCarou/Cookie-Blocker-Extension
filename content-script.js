function checkConfigurationOptions(){
    console.log("Se quieren rechazar todas las cookies")
}
function configurateCookies(privacyApli) {
    switch (privacyApli) {
        case "didomi":
            if(option == "accept" && document.getElementById('didomi-notice-agree-button')){
                document.getElementById('didomi-notice-agree-button').click();
                console.log('Se han aeptado todas las cookies'); 
            }else if(option == "denyAll"){
                checkConfigurationOptions();
            }
            break;
        case "onetrust":
            if(option == "accept" && document.getElementById('onetrust-accept-btn-handler')){
                document.getElementById('onetrust-accept-btn-handler').click();
                console.log('Se han aeptado todas las cookies'); 
            }else if(option == "denyAll"){
                checkConfigurationOptions();
            }
            break;    
        default:
            break;
    }
    
}
function checkForCookiePrefencesElement() {
    // Verificamos si la página contiene un elemento con el ID "didomi-host"
    if (document.getElementById('didomi-host')) {
      console.log('Se ha detectado el uso de el gestor de privacidad DIDOMI');  
      configurateCookies("didomi",option);
    }else if(document.getElementById('onetrust-consent-sdk')){
        console.log('Se ha detectado el uso de el gestor de privacidad ONETRUST');  
      configurateCookies("onetrust",option);  
    }else{

    }
  }
  
  var option = "accept";
  checkForCookiePrefencesElement(option);
  