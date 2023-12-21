const mainDiv = document.getElementById("mainDiv");
const slider = document.getElementById("song-range");
const selector = document.getElementById("selector");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const songDuration = document.getElementById("song-duration");
const mainContainer = document.getElementById("main-container");
const musicPlayer = document.getElementById("music-player-main");
const mainMusicPlayer = document.getElementById("music-player-div");
const songCurrentTime = document.getElementById("song-current-time");

const likedData = localStorage.getItem("liked-data")
    ? JSON.parse(localStorage.getItem("liked-data"))
    : { song: [], playlist: [], artist: [], album: [] };

const musicPlayerData = {
    currentSong: 0,
    songIndex: 0,
    currentSongDetails: {},
    songQueue: [],
};

const loadSongs = async () => {
    const list = await axios.get("https://saavn.me/modules?language=hindi,english,tamil,telugu");
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
        const list = data[i];

        const listMain = document.createElement("div");
        listMain.classList.add("listmain");

        const mainDiv = document.createElement("div");

        const listImage = document.createElement("div");
        listImage.classList.add("listImage");

        const listimg = document.createElement("img");
        listimg.src = Array.isArray(list.image) ? list.image[2].link : list.image;
        listImage.append(listimg);

        mainDiv.append(listImage);

        const listBtns = document.createElement("div");
        listBtns.className = "listBtns";

        listBtns.onclick = openDetails.bind(list);

        const listHov = document.createElement("div");
        listHov.className = "listhov";

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

        const div1 = document.createElement("div");

        const i1 = document.createElement("i");
        i1.onclick = handleLike.bind(list);

        if (likedData[list.type].some((val) => val === list.id)) {
            i1.className = "fa-solid fa-heart fa-lg";
        } else {
            i1.className = "fa-regular fa-heart fa-lg";
        }

        div1.appendChild(i1);
        listHov.append(div1);

        const div2 = document.createElement("div");

        const i2 = document.createElement("i");
        i2.style.color = "white";
        i2.className = "fa-solid fa-ellipsis fa-lg";

        div2.appendChild(i2);
        listHov.append(div2);
        listBtns.append(listHov);
        listImage.append(listBtns);

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");

        const titleh4 = document.createElement("h4");
        titleh4.innerText =
            type === "search" || type === "topTrend"
                ? list.title.replace(/&quot;/g, '"')
                : list.type === "album" || list.type === "song"
                ? list.name.replace(/&quot;/g, '"')
                : list.title.replace(/&quot;/g, '"');

        listTitle.append(titleh4);

        const titleP = document.createElement("p");
        titleP.innerText =
            type === "topTrend"
                ? list.subtitle
                : type === "search"
                ? list.description
                : list.type === "album"
                ? convertArtistToString(list.artists)
                : list.type === "song"
                ? convertArtistToString(list.primaryArtists)
                : list.subtitle;

        listTitle.append(titleP);

        mainDiv.append(listTitle);
        listMain.append(mainDiv);
        cat01.append(listMain);
    }
}

const updateContent = () => {
    const content = document.getElementById("main-container");
    content.innerHTML = "";

    if (window.location.pathname.includes("/search")) {
        loadSearch();
    } else if (window.location.pathname.includes("/get-details")) {
        loadDetails();
    } else {
        loadSongs();
    }
};

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

window.onload = () => {
    updateContent();
};

async function handleLike(event) {
    const { type, id } = this;

    event.stopPropagation();

    const classList = event.target.classList;

    if (classList.contains("fa-solid")) {
        event.target.classList.remove("fa-solid");
        event.target.classList.add("fa-regular");

        const index = likedData[type].indexOf(id);
        likedData[type].splice(index, 1);

        localStorage.setItem("liked-data", JSON.stringify(likedData));
    } else {
        event.target.classList.add("fa-solid");
        event.target.classList.remove("fa-regular");
        likedData[type].push(id);

        localStorage.setItem("liked-data", JSON.stringify(likedData));
    }
}
