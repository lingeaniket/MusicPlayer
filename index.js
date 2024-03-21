window.onload = () => {
    updateContent(); //same file
};

function closeOptions(event) {
    if (!(event.target.classList.contains("options") || event.target.parentNode.classList.contains("optionsDiv"))) {
        const optionsDiv = Array.from(document.getElementsByClassName("optionsDiv"));

        optionsDiv.forEach((val) => {
            val.style.visibility = "hidden";
            val.style.opacity = 0;
        });
    } else if (event.target.classList.contains("options")) {
        const containers = document.querySelectorAll(".options");
        const containersArray = Array.from(containers);

        const clickedContainerIndex = containersArray.findIndex((container) => {
            return container === event.target || container.contains(event.target);
        });

        if (clickedContainerIndex > -1) {
            for (let i = 0; i < containersArray.length; i++) {
                if (i !== clickedContainerIndex) {
                    const val = containersArray[i];
                    const optionsDiv = val.parentNode.getElementsByClassName("optionsDiv")[0];
                    optionsDiv.style.visibility = "hidden";
                    optionsDiv.style.opacity = 0;
                }
            }
        }
    }
}

window.addEventListener("click", closeOptions);

function updateContent() {
    const content = document.getElementById("main-container");
    content.innerHTML = "";
    loadPlaylist(); // same file
    loadLanguages(); // same file

    if (window.location.pathname.includes("/search")) {
        loadSearch(); // mainLoadingFunction.js 1
    } else if (window.location.pathname.includes("/get-details")) {
        loadDetails(); // mainLoadingFunction.js 74
    } else if (window.location.pathname.includes("/liked")) {
        loadLiked("liked"); // likedFunctions.js 1
    } else if (window.location.pathname.includes("/history")) {
        loadLiked("history"); // likedFunctions.js 1
    } else if (window.location.pathname.includes("/my-playlist")) {
        loadMyPlaylist(); // playlist.js 1
    } else {
        loadSongs(); // home.js 1
    }
}

function loadPlaylist() {
    updatePlaylist(); // playlistAcess.js
}

function loadLanguages() {
    const formId = document.getElementById("languageForm");
    formId.innerHTML = "";

    formId.onsubmit = handlelanguages; // same file
    const langDiv = document.getElementById("selectedLanguages");
    langDiv.innerText = localLanguages.toString().replaceAll(",", ", ");

    const div1 = document.createElement("div");
    div1.className = "form01";

    for (let i = 0; i < avilableLanguages.length; i++) {
        const label1 = document.createElement("label");
        label1.htmlFor = avilableLanguages[i].toLowerCase();
        label1.className = "form02";
        const input1 = document.createElement("input");
        input1.type = "checkbox";
        input1.value = avilableLanguages[i].toLowerCase();
        input1.id = avilableLanguages[i].toLowerCase();
        input1.name = "languages";
        input1.checked = localLanguages.some((val) => val.toLowerCase() === avilableLanguages[i].toLowerCase());
        const span1 = document.createElement("span");
        span1.className = "form03";
        span1.innerText = avilableLanguages[i];
        label1.append(input1);
        label1.append(span1);
        div1.append(label1);
    }

    const butto1 = document.createElement("button");
    butto1.innerText = "Update";
    butto1.className = "langSub";
    div1.append(butto1);

    formId.append(div1);
}

function handlelanguages(event) {
    event.preventDefault();
    const formId = document.getElementById("languageForm");
    const checkboxes = formId.querySelectorAll('input[name="languages"]');

    const checkedValues = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value);
        }
    });
    localLanguages = checkedValues;

    localStorage.setItem("local-languages", JSON.stringify(checkedValues));

    loadLanguages(); // same file
    handleToggleLang(event); // same file

    if (window.location.pathname === "/" || window.location.pathname === "") {
        loadSongs();
    }
}

function handleToggleLang(event) {
    const formId = document.getElementById("languageForm");
    const itag = event.target.closest(".lang01").getElementsByTagName("i")[0];
    if (formId.classList.contains("formOpen")) {
        formId.classList.remove("formOpen");
        document.getElementById("12");

        itag.classList.remove("fa-chevron-down");
        itag.classList.add("fa-chevron-up");
    } else {
        formId.classList.add("formOpen");
        itag.classList.add("fa-chevron-down");
        itag.classList.remove("fa-chevron-up");
    }
}

window.addEventListener("popstate", function () {
    updateContent(); // same file
});
