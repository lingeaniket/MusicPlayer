function handleVolume(event) {
    const volume = event.target.value;

    musicPlayer.volume = Number(volume / 100);
}


slider1.oninput = function () {
  handleSlider(1);
};

slider2.oninput = function () {
  handleSlider(2);
};

async function handleSlider(slider) {
  if (timerData) {
      clearInterval(timerData);
  }
  if (slider === 1) {
      slider2.value = slider1.value;
      handleProgress();
  } else {
      slider1.value = slider2.value;
      handleProgress();
  }
}

async function handleProgress() {
  musicPlayer.currentTime = slider1.value;
  selector1.style.left = (slider1.value * 100) / musicPlayer.duration + "%";
  progressBar1.style.width = (slider1.value * 100) / musicPlayer.duration + "%";

  selector2.style.left = (slider2.value * 100) / musicPlayer.duration + "%";
  progressBar2.style.width = (slider2.value * 100) / musicPlayer.duration + "%";
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

async function handleNextSong(mode) {
    if (mode === "ended") {
        addToRecent({ ...musicPlayerData.currentSong, type: "song" });
    }

    if (isArtist && musicPlayerData.songIndex + 1 === musicPlayerData.songQueue.length && currentQueuePage * 10 < totalArtistSongs) {
        currentQueuePage = currentQueuePage + 1;
        const playerData = await axios.get(`https://saavn.dev/artists/${currentArtistId}/songs?page=${currentQueuePage}`);
        playerData.data.data.results.forEach((data) => {
            musicPlayerData.songQueue.push(data);
        });
    }
    if (musicPlayerData.songQueue[musicPlayerData.songIndex + 1]) {
        musicPlayerData.currentSong = musicPlayerData.songQueue[musicPlayerData.songIndex + 1];
        musicPlayerData.songIndex += 1;
        await playMusicPlayer();
        await loadQueueData();
    } else {
        if (musicPlayer.src) {
            musicPlayer.pause();
        }
        slider1.value = 0;

        playPauseBtn.classList.add("fa-play");
        playPauseBtn.classList.remove("fa-pause");
        handleSlider(1);
    }
}
