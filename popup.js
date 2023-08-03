document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");

    // Al cargar la página, se verifica el valor almacenado previamente
    chrome.storage.sync.get("accepted", function (data) {
        if (data.accepted === true) {
            acceptRadio.checked = true;
        } else {
            rejectRadio.checked = true;
        }
    });

    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted: true });
    });

    rejectRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted: false });
    });

    // Escucha el mensaje desde background.js para solicitar el valor
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.message === "getAcceptedStatus") {
            alert('popip.js ha recibido la peticion')
            const accepted = acceptRadio.checked;
            sendResponse({ accepted });
        }
    });
});