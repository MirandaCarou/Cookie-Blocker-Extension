document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");
    const doNothingRadio = document.getElementById("doNothing");
    const lenguagesElements = document.getElementById("cookieLanguage");
    const textsToChange = document.querySelectorAll("[data-section]");

    // Al cargar la página, se verifica el valor almacenado previamente
    chrome.storage.sync.get("accepted", function (data) {
        if (data.accepted === "acceptAll" ) {
            acceptRadio.checked = true;
			rejectRadio.checked = false;
			doNothingRadio.checked = false;
        } else if (data.accepted === "denyAll") {
            rejectRadio.checked = true;
			acceptRadio.checked = false;
			doNothingRadio.checked = false;
        } else {
            doNothingRadio.checked = true;
			rejectRadio.checked = false;
			acceptRadio.checked = false;
        }
    });
    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted: "acceptAll" })
		rejectRadio.checked = false;
		doNothingRadio.checked = false;
    });

    rejectRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted : "denyAll" });
		acceptRadio.checked = false;
		doNothingRadio.checked = false;
    });

	doNothingRadio.addEventListener("click", function () {
        chrome.storage.sync.set({ accepted : "" });
		acceptRadio.checked = false;
		rejectRadio.checked = false;
    });

    const changelanguages = async language =>{
        const requestJson = await fetch(`../languages/${language}.json`);
        const texts = await requestJson.json();

        for(const textToChange of textsToChange){
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
            textToChange.innerHTML = texts[section][value];
        }
    };
    lenguagesElements.addEventListener("click", (e) => {
        changelanguages(e.target.parentElement.dataset.language);
    });
});

