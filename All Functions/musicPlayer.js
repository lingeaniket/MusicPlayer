async function playCategory(event) {
    event.stopPropagation();
    let playerData = null;

    isArtist = this.type === "artist" ? true : false;
    currentQueuePage = 0;
    totalArtistSongs = 0;
    musicPlayerData.songIndex = 0;

    closeForceOptions(); // commonFunction.js 76
    addToRecent(this); // same file 105  recently played songs (history)

    if (this.type === "artist") {
        playerData = await axios.get(`https://jio-saavn-api.onrender.com/${this.id}/songs?page=1`);
        totalArtistSongs = playerData.data.data.total;
        currentQueuePage = 1;
        currentArtistId = this.id;
    } else {
        playerData = await axios.get(`https://jio-saavn-api.onrender.com/${this.type}?id=${this.id}`);
    }

    const songsData = playerData.data.data;
    console.log(songsData);

    if (this.type === "artist") {
        musicPlayerData.currentSong = songsData.results[0];
        musicPlayerData.songQueue = songsData.results;
    }
    // else if (this.type === "song") {
    //     musicPlayerData.currentSong = songsData.songs[0];
    //     musicPlayerData.songQueue = songsData.songs;
    // }
    else {
        musicPlayerData.currentSong = songsData.songs[0];
        musicPlayerData.songQueue = songsData.songs;
    }

    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    queueData = [];

    await playMusicPlayer();
    await loadQueueData();
}

async function playMusicPlayer() {
    musicPlayerData.currentSongDetails = musicPlayerData.currentSong;

    musicPlayer.src = musicPlayerData.currentSongDetails.download_url[4].link;

    musicPlayer.onloadedmetadata = function () {
        slider1.max = musicPlayer.duration;
        slider1.value = musicPlayer.currentTime;
        slider2.max = musicPlayer.duration;
        slider2.value = musicPlayer.currentTime;
    };

    mainMusicPlayer.classList.remove("not-playing");
    updateCurrentSongDetails(); // same file 73
    musicPlayer.play();
    timerData = setInterval(() => {
        slider1.value = musicPlayer.currentTime;
        selector1.style.left = (slider1.value * 100) / musicPlayer.duration + "%";
        progressBar1.style.width = (slider1.value * 100) / musicPlayer.duration + "%";

        slider2.value = musicPlayer.currentTime;
        selector2.style.left = (slider2.value * 100) / musicPlayer.duration + "%";
        progressBar2.style.width = (slider2.value * 100) / musicPlayer.duration + "%";
        songCurrentTime.innerText = formatTime(slider1.value);

        songDuration.innerText = formatTime(musicPlayer.duration);
    }, 500);
}

function updateCurrentSongDetails() {
    const player = document.getElementById("player-meta");
    player.innerHTML = "";

    const player02 = document.createElement("div");
    player02.classList.add("player-02");

    player02.onclick = handleImageQueue; // queue.js 115

    const img01 = document.createElement("img");
    img01.src = musicPlayerData.currentSongDetails.image[2].link;

    player02.append(img01);
    player.append(player02);

    const player03 = document.createElement("div");
    player03.classList.add("player-03");
    player03.classList.add("list-title");

    const h3player = document.createElement("h3");
    h3player.innerText = convertName(musicPlayerData.currentSongDetails.name);

    player03.append(h3player);

    const pPlayer = document.createElement("p");
    // pPlayer.innerText = convertName(
    //     musicPlayerData.currentSongDetails.primaryArtists + ", " + musicPlayerData.currentSongDetails.featuredArtists
    // );
    pPlayer.innerText = musicPlayerData.currentSongDetails.subtitle;

    player03.append(pPlayer);
    player.append(player03);
}

async function addToRecent(data) {
    const { type, id, image, name, title, subtitle } = data;
    const obj = { type, id, image, name, title, subtitle };

    let elIndex = null;

    if (
        recentData[type] &&
        recentData[type].some((val, index) => {
            if (val.id === id) {
                elIndex = index;
            }
            return val.id === id;
        })
    ) {
        recentData[type].splice(elIndex, 1);
    }
    if (type === "song") {
        if (recentData[type].length === 99) {
            recentData[type].pop();
        }
    } else {
        if (recentData[type].length === 23) {
            recentData[type].pop();
        }
    }

    recentData[type].unshift(obj);

    localStorage.setItem("recent-data", JSON.stringify(recentData));
}
