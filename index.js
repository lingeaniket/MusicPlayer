// import axios from "axios";
// const axios  = require('axios')

const mainDiv = document.getElementById("mainDiv");

const musicPlayerData = {
    currentSong: 0,
    songIndex: 0,
    songQueue: [],
};

let timerData = null;

const slider = document.getElementById("song-range");
const selector = document.getElementById("selector");
const progressBar = document.getElementById("progressBar");
const musicPlayer = document.getElementById("music-player-main");
// const musicPlayer = document.createElement("audio")
slider.oninput = function () {
    if(timerData){
        clearInterval(timerData);
    }
    musicPlayer.currentTime = slider.value;
    selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
    progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";

    timerData = setInterval(() => {
        slider.value = musicPlayer.currentTime;
        selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
        progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";
        // console.log(slider.value)
    }, 500);

    // musicPlayer.play();
    // console.log(musicPlayer.currentTime);
};

const loadSongs = async () => {
    const list = await axios.get("https://saavn.me/modules?language=hindi,english,tamil");
    const homeData = list.data.data;

    const mainContainer = document.getElementById("main-container");
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

const loadData = () => {
    loadSongs();
};

window.onload = () => {
    loadData();
};

function convertArtistToString(artists) {
    let titleString = "";
    artists.forEach((artist, idx) => {
        if (idx !== artists.length - 1) {
            titleString += artist.name + ", ";
        } else {
            titleString += artist.name;
        }
    });
    return titleString;
}

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
        titleh4.innerText = list.type === "album" || list.type === "song" ? list.name : list.title;

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

async function playCategory() {
    const playerData = await axios.get(`https://saavn.me/${this.type}s?id=${this.id}`);
    // console.log(playerData.data.data);
    const songsData = playerData.data.data;
    musicPlayerData.currentSong = songsData.songs[0].id;
    musicPlayerData.songIndex = 0;
    musicPlayerData.songQueue = songsData.songs.map((song) => song.id);
    // setTimeout(() => {
    playMusicPlayer();
    // }, 200);
}

async function playMusicPlayer() {
    const songDetailsData = await axios.get(`https://saavn.me/songs?id=${musicPlayerData.currentSong}`);
    const songDetails = songDetailsData.data.data[0];
    console.log(musicPlayer);

    musicPlayer.src = songDetails.downloadUrl[4].link;
    musicPlayer.onloadedmetadata = function () {
        slider.max = musicPlayer.duration;
        slider.value = musicPlayer.currentTime;
    };
    musicPlayer.play();
    timerData = setInterval(() => {
        slider.value = musicPlayer.currentTime;
        selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
        progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";
        // console.log(slider.value)
    }, 500);
}

// if(musicPlayer.play()) {
//     setInterval(()=>{
//         slider.value = musicPlayer.currentTime;
//     }, 500)
// }

// slider.onchange = function () {
//     musicPlayer.play();
//     musicPlayer.currentTime = slider.value;
// };
