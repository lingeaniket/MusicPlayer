const mainDiv = document.getElementById("mainDiv");
const slider1 = document.getElementById("song-range1");
const selector1 = document.getElementById("selector1");
const slider2 = document.getElementById("song-range2");
const selector2 = document.getElementById("selector2");
const playPauseBtn = document.getElementById("playPause");
const progressBar1 = document.getElementById("progressBar1");
const progressBar2 = document.getElementById("progressBar2");
const songDuration = document.getElementById("song-duration");
const mainContainer = document.getElementById("main-container");
const musicPlayer = document.getElementById("music-player-main");
const mainMusicPlayer = document.getElementById("music-player-div");
const songCurrentTime = document.getElementById("song-current-time");

const likedData = localStorage.getItem("liked-data")
    ? JSON.parse(localStorage.getItem("liked-data"))
    : { song: [], playlist: [], artist: [], album: [] };

const recentData = localStorage.getItem("recent-data")
    ? JSON.parse(localStorage.getItem("recent-data"))
    : { song: [], playlist: [], artist: [], album: [] };

const myPlaylistData = localStorage.getItem("my-playlist-data")
    ? JSON.parse(localStorage.getItem("my-playlist-data"))
    : { lastId: 0, data: [] };

const avilableLanguages = [
    "Hindi",
    "English",
    "Punjabi",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Bengali",
    "Kannada",
    "Bhojpuri",
    "Malayalam",
    "Urdu",
    "Haryanvi",
    "Rajasthani",
    "Odia",
    "Assamese",
];
let localLanguages = localStorage.getItem("local-languages") ? JSON.parse(localStorage.getItem("local-languages")) : ["hindi", "english"];

const musicPlayerData = {
    currentSong: 0,
    songIndex: 0,
    currentSongDetails: {},
    songQueue: [],
};

const loadSongs = async () => {
    mainContainer.innerHTML = "";
    const list = await axios.get(`https://saavn.me/modules?language=${localLanguages.toString()}`);
    const homeData = list.data.data;

    for (let key in homeData) {
        const catMainTitle = document.createElement("div");
        catMainTitle.classList.add("cat-main-title");

        const h2Title = document.createElement("h2");
        h2Title.innerText = `top ${key}`;

        catMainTitle.append(h2Title);
        mainContainer.append(catMainTitle);

        const cat01 = document.createElement("div");
        cat01.classList.add("cat-01");

        if (Array.isArray(homeData[key])) {
            createListItems(homeData[key], cat01);
        } else {
            const inData = homeData[key];
            for (let innerKey in inData) {
                createListItems(inData[innerKey], cat01);
            }
        }

        mainContainer.append(cat01);
    }
};

function createListItems(data, cat01, type) {
    for (let i = 0; i < data.length; i++) {
        let list = {};
        if (type === "song-yml") {
            list = { ...data[i], type: "song" };
        } else {
            list = data[i];
        }

        const listMain = document.createElement("div");
        listMain.classList.add("listmain");

        const mainDiv = document.createElement("div");

        const imgdiv = document.createElement("div");
        imgdiv.className = "imgDiv";

        const listImage = document.createElement("div");
        listImage.classList.add("listImage");
        if (list.type === "artist") {
            listImage.style.borderRadius = "50%";
        }

        const listimg = document.createElement("img");
        listimg.src = Array.isArray(list.image) ? list.image[2].link : list.image;
        listImage.append(listimg);

        imgdiv.append(listImage);
        mainDiv.append(imgdiv);

        const listBtns = document.createElement("div");
        listBtns.className = "listBtns";

        listBtns.onclick = openDetails.bind(list);

        const listHov = document.createElement("div");
        listHov.className = "listhov save-library";

        const listabs = document.createElement("div");
        listabs.className = "listabs";

        const listabs2 = document.createElement("div");
        listabs2.className = "listabs listhovflex";

        const listplaybtn = document.createElement("div");
        listplaybtn.className = "listplaybtn";
        listplaybtn.onclick = playCategory.bind(list);

        listabs2.append(listplaybtn);
        listabs.append(listabs2);

        const listabs3 = document.createElement("div");
        listabs3.className = "listabs listhovflex";
        listabs3.style.pointerEvents = "none";

        const listi1 = document.createElement("i");
        listi1.className = "fa-solid fa-play fa-sm";
        listi1.style.color = "white";

        listabs3.append(listi1);
        listabs.append(listabs3);
        listHov.append(listabs);
        if (list.type !== "artist") {
            const div1 = document.createElement("div");

            const i1 = document.createElement("i");
            i1.onclick = handleLike.bind(list);

            if (likedData[list.type].some((val) => val.id === list.id)) {
                i1.className = "fa-solid fa-heart fa-lg";
            } else {
                i1.className = "fa-regular fa-heart fa-lg";
            }

            div1.appendChild(i1);
            listHov.append(div1);

            const div2 = document.createElement("div");
            div2.className = "options";
            div2.onclick = loadOptions.bind(list);

            const i2 = document.createElement("i");

            i2.style.color = "white";
            i2.className = "fa-solid fa-ellipsis fa-lg";

            div2.appendChild(i2);
            listHov.append(div2);
            const div3 = document.createElement("div");
            div3.className = "optionsDiv";
            listHov.append(div3);
        }

        listBtns.append(listHov);
        listImage.append(listBtns);

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");

        const titleh4 = document.createElement("h4");
        titleh4.innerText = list.name ? list.name.replace(/&quot;/g, '"') : list.title.replace(/&quot;/g, '"');

        listTitle.append(titleh4);

        const titleP = document.createElement("p");
        titleP.innerText =
            type === "topTrend"
                ? list.subtitle
                : type === "search"
                ? list.description
                : list.type === "album"
                ? list.artists
                    ? Array.isArray(list.artists)
                        ? convertArtistToString(list.artists)
                        : list.artists
                    : list.subtitle
                : list.type === "song"
                ? list.primaryArtists
                    ? Array.isArray(list.primaryArtists)
                        ? convertArtistToString(list.primaryArtists)
                        : list.primaryArtists
                    : list.subtitle
                : list.type !== "artist"
                ? list.subtitle
                : "";

        listTitle.append(titleP);

        mainDiv.append(listTitle);
        listMain.append(mainDiv);
        cat01.append(listMain);
    }
}

function handleLikeFromOptions(event) {
    event.stopPropagation();
    console.log(this);
    const parent = event.target.closest(".save-library");
    const { type, id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type, id, image, primaryArtists, artists, name, title, subtitle };
    if (parent) {
        const heart = parent.querySelector(".fa-heart");
        if (heart) {
            if (heart.classList.contains("fa-regular")) {
                heart.classList.remove("fa-regular");
                heart.classList.add("fa-solid");
                likedData[type].push(obj);
                event.target.innerText = "Remove from Library";
            } else {
                heart.classList.add("fa-regular");
                heart.classList.remove("fa-solid");
                const index = likedData[type].findIndex((item) => item.id === id);
                likedData[type].splice(index, 1);

                event.target.innerText = "Save to Library";
            }
        }
    }
    localStorage.setItem("liked-data", JSON.stringify(likedData));
    closeForceOptions();
}

async function handleLike(event) {
    var buttonElement = event.target.closest("i");
    const { type, id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type, id, image, primaryArtists, artists, name, title, subtitle };

    event.stopPropagation();

    const classList = buttonElement.classList;

    if (classList.contains("fa-solid")) {
        buttonElement.classList.remove("fa-solid");
        buttonElement.classList.add("fa-regular");
        const index = likedData[type].findIndex((item) => item.id === id);
        likedData[type].splice(index, 1);
    } else {
        buttonElement.classList.add("fa-solid");
        buttonElement.classList.remove("fa-regular");
        likedData[type].push(obj);
    }
    localStorage.setItem("liked-data", JSON.stringify(likedData));
}

async function handleHistoryRoute() {
    window.history.pushState({}, "", "/history");
    updateContent();
}
async function handleLikeRoute() {
    window.history.pushState({}, "", "/liked");
    updateContent();
}

const updateContent = () => {
    const content = document.getElementById("main-container");
    content.innerHTML = "";
    loadPlaylist();
    loadLanguages();

    if (window.location.pathname.includes("/search")) {
        loadSearch();
    } else if (window.location.pathname.includes("/get-details")) {
        loadDetails();
    } else if (window.location.pathname.includes("/liked")) {
        loadLiked("liked");
    } else if (window.location.pathname.includes("/history")) {
        loadLiked("history");
    } else if (window.location.pathname.includes("/my-playlist")) {
        loadMyPlaylist();
    } else {
        loadSongs();
    }
};

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

function loadLanguages() {
    const formId = document.getElementById("languageForm");
    formId.innerHTML = "";

    formId.onsubmit = handlelanguages;
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

    loadLanguages();
    handleToggleLang(event);

    if (window.location.pathname === "/" || window.location.pathname === "") {
        loadSongs();
    }
}

function loadOptions(event) {
    closeOptions(event);
    console.log(event.target);
    event.stopPropagation();
    const { top, left } = event.target.parentNode.getBoundingClientRect();

    const optionsDiv = event.target.parentNode.getElementsByClassName("optionsDiv")[0];
    optionsDiv.style.opacity = 1;
    optionsDiv.style.visibility = "visible";
    backToPlaylist.bind(this)(optionsDiv);
    // console.log(optionsDiv);
    if (top > window.innerHeight / 2) {
        optionsDiv.style.bottom = "10%";
    } else {
        optionsDiv.style.top = "100%";
    }
    if (left < window.innerWidth / 2) {
        optionsDiv.style.right = "-100%";
    } else {
        optionsDiv.style.right = "10%";
    }
}

const handleHomeRoute = () => {
    window.history.pushState({}, "", "/");
    updateContent();
};

const handleSearchRoute = () => {
    window.history.pushState({}, "", "/search");
    updateContent();
};

window.addEventListener("popstate", function () {
    updateContent();
});

function closeForceOptions() {
    const containers = document.querySelectorAll(".options");
    const containersArray = Array.from(containers);

    for (let i = 0; i < containersArray.length; i++) {
        const val = containersArray[i];
        const optionsDiv = val.parentNode.getElementsByClassName("optionsDiv")[0];
        optionsDiv.style.visibility = "hidden";
        optionsDiv.style.opacity = 0;
    }
}

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

window.onload = () => {
    updateContent();
};

function handleOpenPlaylist(event) {
    const parent = event.target.closest(".sideIcon");

    if (parent.classList.contains("playlistClose")) {
        parent.classList.remove("playlistClose");
    } else {
        parent.classList.add("playlistClose");
    }
}
