function checkConfigurationOptions(){
    console.log("Se quieren rechazar todas las cookies")
}
function configurateCookies(privacyApli) {
    switch (privacyApli) {
        case "didomi":
            if(option == "accept" && document.getElementById('didomi-notice-agree-button')){
                document.getElementById('didomi-notice-agree-button').click();
                console.log('Se han aeptado todas las cookies'); 
            }else if(option == "denyAll" && document.getElementById('didomi-notice-learn-more-button')){
                document.getElementById('didomi-notice-learn-more-button').click();
                checkConfigurationOptions();
            }
            break;
        case "onetrust":
            if(option == "accept" && document.getElementById('onetrust-accept-btn-handler')){
                document.getElementById('onetrust-accept-btn-handler').click();
                console.log('Se han aceptado todas las cookies'); 
            }else if(option == "denyAll" && document.getElementById('onetrust-pc-btn-handler')){
                document.getElementById('onetrust-pc-btn-handler').click();
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

    chrome.runtime.sendMessage({ message: "getAcceptedStatus" }, function (response) {
        console.log('Se va a solicitar el valor');
        const accepted = response.accepted;
        console.log("Valor recibido desde popup.js:", accepted);

        var option = accepted ? "accept" : "denyAll";
        checkForCookiePrefencesElement(option);
    });


  checkForCookiePrefencesElement(option);
  