const mainDiv = document.getElementById("mainDiv");
const slider = document.getElementById("song-range");
const selector = document.getElementById("selector");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const songDuration = document.getElementById("song-duration");
const mainContainer = document.getElementById("main-container");
const musicPlayer = document.getElementById("music-player-main");
const songCurrentTime = document.getElementById("song-current-time");

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

        mainContainer.append(catMainTitle);
        mainContainer.append(cat01);
    }
};

function createListItems(data, cat01) {
    for (let i = 0; i < data.length; i++) {
        const list = data[i];

        const listMain = document.createElement("div");
        listMain.classList.add("listmain");

        const mainDiv = document.createElement("div");

        mainDiv.onclick = playCategory.bind(list);

        const listImage = document.createElement("div");
        listImage.classList.add("listImage");

        const listimg = document.createElement("img");
        listimg.src = list.image[2].link;
        listImage.append(listimg);

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");

        const titleh4 = document.createElement("h4");
        titleh4.innerText =
            list.type === "album" || list.type === "song" ? list.name.replace(/&quot;/g, '"') : list.title.replace(/&quot;/g, '"');

        const titleP = document.createElement("p");
        titleP.innerText =
            list.type === "album"
                ? convertArtistToString(list.artists)
                : list.type === "song"
                ? convertArtistToString(list.primaryArtists)
                : list.subtitle;

        listTitle.append(titleh4);
        listTitle.append(titleP);

        mainDiv.append(listImage);
        mainDiv.append(listTitle);
        listMain.append(mainDiv);
        cat01.append(listMain);
    }
}

const updateContent = () => {
    const content = document.getElementById("main-container");
    content.innerHTML = "";
    if (window.location.pathname === "/search") {
        content.innerHTML = "<p>Hello search</p>";
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
    loadSongs();
};
