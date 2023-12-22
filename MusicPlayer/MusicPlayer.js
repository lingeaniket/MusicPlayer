let timerData = null;
let isArtist = false;

let totalArtistSongs = 0;
let currentQueuePage = 0;
let currentArtistId = null;

async function playCategory(event) {
    event.stopPropagation();
    isArtist = this.type === "artist" ? true : false;
    currentQueuePage = 0;
    totalArtistSongs = 0;

    let playerData = null;
    musicPlayerData.songIndex = 0;

    if (this.type === "artist") {
        playerData = await axios.get(`https://saavn.me/artists/${this.id}/songs?page=1`);
        totalArtistSongs = playerData.data.data.total;
        currentQueuePage = 1;
        currentArtistId = this.id;
    } else {
        playerData = await axios.get(`https://saavn.me/${this.type}s?id=${this.id}`);
    }
    const songsData = playerData.data.data;

    if (this.type === "artist") {
        musicPlayerData.currentSong = songsData.results[0];
        musicPlayerData.songQueue = songsData.results;
    } else if (this.type === "song") {
        musicPlayerData.currentSong = songsData[0];
        musicPlayerData.songQueue = songsData;
    } else {
        musicPlayerData.currentSong = songsData.songs[0];
        musicPlayerData.songQueue = songsData.songs;
    }

    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    queueData = [];

    await playMusicPlayer();
    await loadQueueData();
}

slider.oninput = function () {
    if (timerData) {
        clearInterval(timerData);
    }

    musicPlayer.currentTime = slider.value;
    selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
    progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";

    timerData = setInterval(() => {
        slider.value = musicPlayer.currentTime;
        selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
        progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";
        songCurrentTime.innerText = formatTime(slider.value);
    }, 500);
};

async function playMusicPlayer() {
    musicPlayerData.currentSongDetails = musicPlayerData.currentSong;

    musicPlayer.src = musicPlayerData.currentSongDetails.downloadUrl[4].link;

    musicPlayer.onloadedmetadata = function () {
        slider.max = musicPlayer.duration;
        slider.value = musicPlayer.currentTime;
    };

    mainMusicPlayer.classList.remove("not-playing");
    updateCurrentSongDetails();
    musicPlayer.play();
    timerData = setInterval(() => {
        slider.value = musicPlayer.currentTime;
        selector.style.left = (slider.value * 100) / musicPlayer.duration + "%";
        progressBar.style.width = (slider.value * 100) / musicPlayer.duration + "%";
        songCurrentTime.innerText = formatTime(slider.value);
        songDuration.innerText = formatTime(musicPlayer.duration);
    }, 500);
}

function updateCurrentSongDetails() {
    const player = document.getElementById("player-meta");
    player.innerHTML = "";

    const player02 = document.createElement("div");
    player02.classList.add("player-02");

    const img01 = document.createElement("img");
    img01.src = musicPlayerData.currentSongDetails.image[2].link;

    player02.append(img01);
    player.append(player02);

    const player03 = document.createElement("div");
    player03.classList.add("player-03");
    player03.classList.add("list-title");

    const h3player = document.createElement("h3");
    h3player.innerText = musicPlayerData.currentSongDetails.name.replace(/&quot;/g, '"');

    player03.append(h3player);

    const pPlayer = document.createElement("p");
    pPlayer.innerText = musicPlayerData.currentSongDetails.primaryArtists + ", " + musicPlayerData.currentSongDetails.featuredArtists;

    player03.append(pPlayer);
    player.append(player03);
}

async function handlePrevSong() {
    if (musicPlayerData.songIndex - 1 > -1 && musicPlayerData.songQueue[musicPlayerData.songIndex - 1]) {
        musicPlayerData.currentSong = musicPlayerData.songQueue[musicPlayerData.songIndex - 1];
        musicPlayerData.songIndex -= 1;
        await playMusicPlayer();
        await loadQueueData();
    }
}

function playPauseMusic() {
    if (playPauseBtn.classList.contains("fa-play")) {
        playPauseBtn.classList.remove("fa-play");
        playPauseBtn.classList.add("fa-pause");
        if (musicPlayer.src) {
            musicPlayer.play();
        }
    } else {
        playPauseBtn.classList.add("fa-play");
        playPauseBtn.classList.remove("fa-pause");
        if (musicPlayer.src) {
            musicPlayer.pause();
        }
    }
}

async function handleNextSong() {
    if (isArtist && musicPlayerData.songIndex + 1 === musicPlayerData.songQueue.length && currentQueuePage * 10 < totalArtistSongs) {
        currentQueuePage = currentQueuePage + 1;
        const playerData = await axios.get(`https://saavn.me/artists/${currentArtistId}/songs?page=${currentQueuePage}`);
        playerData.data.data.results.forEach((data) => {
            musicPlayerData.songQueue.push(data);
        });
        // musicPlayerData.songQueue = [...musicPlayerData.songQueue, ...playerData.data.data.results];
    }
    if (musicPlayerData.songQueue[musicPlayerData.songIndex + 1]) {
        musicPlayerData.currentSong = musicPlayerData.songQueue[musicPlayerData.songIndex + 1];
        musicPlayerData.songIndex += 1;
        await playMusicPlayer();
        await loadQueueData();
    }
}

function formatTime(time) {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
}

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
