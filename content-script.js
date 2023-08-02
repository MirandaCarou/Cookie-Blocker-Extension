
function checkForCookiePrefencesElement() {
    // Verificamos si la página contiene un elemento con el ID "didomi-host"
    if (document.getElementById('didomi-host')) {
      checkTypeDidomeModal()  
    }
  
  }
  function checkTypeDidomeModal() {
    if(document.getElementById('didomi-popup')){
        console.log('La página puede contener un popup en el medio"');
    }else if(document.getElementById('didomi-notice')){
        console.log('La página puede contener un popup arriba o abajo');
    }
  }

  checkForCookiePrefencesElement();
  