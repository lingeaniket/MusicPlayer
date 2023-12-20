let timerData = null;

async function playCategory() {
    // window.history.pushState({}, "", `/get-details/?type=${this.type}&id=${this.id}`);
    // updateContent()
    let playerData = null;

    if (this.type === "artist") {
        playerData = await axios.get(`https://saavn.me/artists/${this.id}/songs?page=1`);
    } else {
        playerData = await axios.get(`https://saavn.me/${this.type}s?id=${this.id}`);
    }
    const songsData = playerData.data.data;
    if (this.type === "artist") {
        musicPlayerData.currentSong = songsData.results[0].id;
        musicPlayerData.songQueue = songsData.results.map((song) => song.id);
    } else if (this.type === "song") {
        musicPlayerData.currentSong = songsData[0].id;
        musicPlayerData.songQueue = songsData.map((song) => song.id);
    } else {
        musicPlayerData.currentSong = songsData.songs[0].id;
        musicPlayerData.songQueue = songsData.songs.map((song) => song.id);
    }
    musicPlayerData.songIndex = 0;

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
    const songDetailsData = await axios.get(`https://saavn.me/songs?id=${musicPlayerData.currentSong}`);

    musicPlayerData.currentSongDetails = songDetailsData.data.data[0];

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
    const pPlayer = document.createElement("p");
    pPlayer.innerText = musicPlayerData.currentSongDetails.primaryArtists + ", " + musicPlayerData.currentSongDetails.featuredArtists;

    player03.append(h3player);
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
