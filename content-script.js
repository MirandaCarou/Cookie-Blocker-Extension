

function checkConfigurationOptions(){
    console.log("Se quieren rechazar todas las cookies")
}
function configurateCookies(privacyApli) {
    switch (privacyApli) {
        case "didomi":
            if(preferences == "acceptAll" && document.getElementById('didomi-notice-agree-button')){
                document.getElementById('didomi-notice-agree-button').click();
                console.log('Se han aeptado todas las cookies'); 
            }else if(preferences == "denyAll" && document.getElementById('didomi-notice-learn-more-button')){
                document.getElementById('didomi-notice-learn-more-button').click();
                checkConfigurationOptions();
            }
            break;
        case "onetrust":
            if(preferences == "acceptAll" && document.getElementById('onetrust-accept-btn-handler')){
                document.getElementById('onetrust-accept-btn-handler').click();
                console.log('Se han aceptado todas las cookies'); 
            }else if(preferences == "denyAll" && document.getElementById('onetrust-pc-btn-handler')){
                document.getElementById('onetrust-pc-btn-handler').click();
                checkConfigurationOptions();
            }
            break;    
        default:
            break;
    }
    
}
function checkForCookiePrefencesElement(preferences) {
    // Verificamos si la página contiene un elemento con el ID "didomi-host"
    if (document.getElementById('didomi-host')) {
      console.log('Se ha detectado el uso de el gestor de privacidad DIDOMI');  
      configurateCookies("didomi",preferences);
    }else if(document.getElementById('onetrust-consent-sdk')){
      console.log('Se ha detectado el uso de el gestor de privacidad ONETRUST');  
      configurateCookies("onetrust",preferences);  
    }else{

    }
}


var preferences = "";
function checkForCookiePreferences(){
    chrome.storage.sync.get("accepted", function (data) {
        console.log("Value currently is " + data.accepted);
        preferences = data.accepted;
        console.log("The preference value is "+ preferences);
        checkForCookiePrefencesElement(preferences);
    });
    
}

checkForCookiePreferences();

  