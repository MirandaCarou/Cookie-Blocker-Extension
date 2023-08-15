document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");
    var option = false;
    // Al cargar la página, se verifica el valor almacenado previamente
    chrome.storage.sync.get("accepted", function (data) {
        if (data.accepted === "acceptAll" ) {
            acceptRadio.checked = true;
        } else {
            rejectRadio.checked = true;
        }
    });

    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted: "acceptAll" });
    });

    rejectRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted : "denyAll" });
    });
});
chrome.storage.sync.set({ accepted: "denyAll" });