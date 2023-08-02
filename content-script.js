function checkTypeDidomeModal() {
    if(document.getElementById('didomi-popup')){
        console.log('La página puede contener un popup en el medio"');
        return 'didomi-popup';
    }else if(document.getElementById('didomi-notice')){
        console.log('La página puede contener un popup arriba o abajo');
        return 'didomi-notice';
    }
}
function configurateCookies(typeModal) {
    console.log(typeModal);
    if(document.getElementById('didomi-notice-agree-button')){
        var acceptAllButton = document.getElementById('didomi-notice-agree-button');
        acceptAllButton.click();
    }
}
function checkForCookiePrefencesElement() {
    // Verificamos si la página contiene un elemento con el ID "didomi-host"
    if (document.getElementById('didomi-host')) {
      var TypeDidodmeModal = checkTypeDidomeModal(); 
      configurateCookies(TypeDidodmeModal);
    }
  }
  

  checkForCookiePrefencesElement();
  