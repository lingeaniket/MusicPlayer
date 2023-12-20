const mainDiv = document.getElementById("mainDiv");
const slider = document.getElementById("song-range");
const selector = document.getElementById("selector");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const songDuration = document.getElementById("song-duration");
const mainContainer = document.getElementById("main-container");
const musicPlayer = document.getElementById("music-player-main");
const songCurrentTime = document.getElementById("song-current-time");
const mainMusicPlayer = document.getElementById("music-player-div");

const musicPlayerData = {
    currentSong: 0,
    songIndex: 0,
    currentSongDetails: {},
    songQueue: [],
};

const loadSongs = async () => {
    // mainMusicPlayer.classList.remove("not-playing");
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

function createListItems(data, cat01, type) {
    for (let i = 0; i < data.length; i++) {
        const list = data[i];

        const listMain = document.createElement("div");
        listMain.classList.add("listmain");

        const mainDiv = document.createElement("div");

        mainDiv.onclick = playCategory.bind(list);

        const listImage = document.createElement("div");
        listImage.classList.add("listImage");

        const listimg = document.createElement("img");
        listimg.src = Array.isArray(list.image) ? list.image[2].link : list.image;
        listImage.append(listimg);

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");

        const titleh4 = document.createElement("h4");
        titleh4.innerText =
            type === "search" || type === "topTrend"
                ? list.title.replace(/&quot;/g, '"')
                : list.type === "album" || list.type === "song"
                ? list.name.replace(/&quot;/g, '"')
                : list.title.replace(/&quot;/g, '"');

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
    // console.log(window.location.pathname)
    if (window.location.pathname.includes("/search")) {
        loadSearch();
    } else if (window.location.pathname.includes("/get-details")) {
        loadDetails();
    } else {
        loadSongs();
    }
};

async function loadDetails() {
    const searchquerey = window.location.search;
    const query = new URLSearchParams(searchquerey);
    const type = query.get("type");
    const id = query.get("id");
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    url.searchParams.set("id", id);
    window.history.replaceState({}, "", url);

    const playerData = await axios.get(`https://saavn.me/${type}s?id=${id}`);

    const player = playerData.data.data;

    let playerSongs = "";

    if (this.type === "artist") {
        const songs = await axios.get(`https://saavn.me/artists/${id}/songs?page=1`);
        playerSongs = songs.data.data.results;
    } else if (this.type === "song") {
        playerSongs = player;
    } else {
        playerSongs = player.songs;
    }

    const details01 = document.createElement("div");
    details01.className = "details01";

    const details01_1 = document.createElement("div");
    details01_1.className = "details01";

    const details02 = document.createElement("div");
    details02.className = "details02";

    const details03 = document.createElement("div");
    details03.className = "details03";

    const details04 = document.createElement("div");
    details04.className = "details04";

    const img04 = document.createElement("img");
    img04.src = player.image[2].link;

    details04.append(img04);
    details03.append(details04);
    details02.append(details03);

    const details05 = document.createElement("div");
    details05.className = "details05";

    const details06 = document.createElement("div");
    details06.className = "details06";

    const h206 = document.createElement("h2");
    h206.innerText = player.name.replace(/&quot;/g, '"');

    details06.append(h206);

    const div06_01 = document.createElement("div");

    const p06_01 = document.createElement("p");
    p06_01.innerText =
        type === "song"
            ? `${player.primaryArtists}, ${player.featuredArtists} : ${player.playCount} plays`
            : type === "album"
            ? `${player.primaryArtists} ${convertArtistToString(player.featuredArtists)}`
            : `Followers: ${player.followerCount}, Fans : ${player.fanCount}`;

    div06_01.append(p06_01);
    details06.append(div06_01);

    const div06_02 = document.createElement("div");

    const p06_02 = document.createElement("p");
    p06_02.innerText =
        type === "song"
            ? `${player.copyright}, ${player.label}`
            : type === "album"
            ? `${player.songCount} Song${player.songCount > 1 ? "s" : ""}`
            : type === "artist"
            ? `${player.dominantLanguage}, Fans : ${player.dominantType}`
            : `${player.firstname} ${player.lastname}`;

    div06_02.append(p06_02);
    details06.append(div06_02);
    details05.append(details06);

    // const details07 = document.createElement("div");
    // details07.className = "details07";

    // const details08 = document.createElement("div");
    // details08.className = "details08";

    // const details09 = document.createElement("div");
    // details09.className = "details09";

    details02.append(details05);

    details01_1.append(details02);
    details01.append(details01_1);
    mainContainer.append(details01);

    // <div class="details01">
    //     <div class="details01">
    //         <div class="details02">
    //             <div class="details03">
    //                 <div class="details04">
    //                     <img src="" alt="1254" />
    //                 </div>
    //             </div>
    //             <div class="details05">
    //                 <div class="details06">
    //                     <h2>Name of category</h2>
    //                     <div>
    //                         <p><span> singers </span><span> total songs </span></p>
    //                     </div>
    //                     <div>
    //                         <p>Copyright</p>
    //                     </div>
    //                 </div>
    //                 <div class="details07">
    //                     <div>
    //                         <button>Play</button>
    //                     </div>
    //                     <div>
    //                         <button>
    //                             <i class="fa-regular fa-heart fa-xl"></i>
    //                         </button>
    //                     </div>
    //                     <div>
    //                         <button>
    //                             <i class="fa-solid fa-ellipsis fa-xl"></i>
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div>
    //             <div class="details08" style="">
    //                 <h4>mores songs from same album</h4>
    //             </div>
    //             <div class="details09"></div>
    //         </div>
    //         <div class="details03">
    //             <div>
    //                 <h3>Top albums of same artist</h3>
    //             </div>
    //             <div>
    //                 <div class="cat-01">
    //                     <div class="lismain"></div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div>related playlist</div>
    //     </div>
    // </div>
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

window.onload = () => {
    updateContent();
    // loadSongs();
    // loadSearch();
};
