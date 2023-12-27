

async function handleQueueOpen() {
    queueSide.classList.toggle("queue-open");
    mainContainer.classList.toggle("queue-added");

    if (!queueSide.classList.contains("queue-open") && musicPlayerData.currentSong) {
        await loadQueueData();
    } else {
        if (musicPlayerData.songQueue.length > 1 && musicPlayerData.songIndex < musicPlayerData.songQueue.length - 1) {
            queueStack.style.display = "block";
        } else {
            queueStack.style.display = "none";
        }
    }
}

async function loadQueueData() {
    queueCurrent.innerHTML = "";
    queuePlaylist.innerHTML = "";

    const queueMainImg = document.createElement("div");
    queueMainImg.classList.add("queueMainImg");

    const image = document.createElement("img");
    const currentSong = musicPlayerData.currentSongDetails;
    image.src = currentSong.image[2].link;

    queueMainImg.append(image);

    const queue03 = document.createElement("div");
    queue03.classList.add("queue03");

    const head3 = document.createElement("h3");
    head3.innerText = currentSong.name.replace(/&quot;/g, '"');

    const para = document.createElement("p");
    para.innerText = convertName(currentSong.primaryArtists + ", " + currentSong.featuredArtists);

    queue03.append(head3);
    queue03.append(para);

    queueCurrent.append(queueMainImg);
    queueCurrent.append(queue03);

    if (musicPlayerData.songQueue.length > 1 && musicPlayerData.songIndex < musicPlayerData.songQueue.length - 1) {
        queueStack.style.display = "block";

        for (let i = 0; i < musicPlayerData.songQueue.length; i++) {
            if (i > musicPlayerData.songIndex && i < musicPlayerData.songIndex + 5) {
                const val = musicPlayerData.songQueue[i];

                const queue06 = document.createElement("div");
                queue06.classList.add("queue06");

                const queue07 = document.createElement("div");
                queue07.classList.add("queue07");

                const itag = document.createElement("i");
                itag.classList.add("fa-brands");
                itag.classList.add("fa-itunes-note");
                itag.classList.add("fa-xs");
                itag.style.color = "#ffffff";

                queue07.append(itag);

                const queue08 = document.createElement("div");
                queue08.classList.add("queue08");

                const qImg = document.createElement("img");
                const songData = musicPlayerData.songQueue[i];
                qImg.src = songData.image[2].link;

                queue08.append(qImg);

                const queue09 = document.createElement("div");
                queue09.classList.add("queue09");

                const inDiv = document.createElement("div");

                const inH4 = document.createElement("h4");
                inH4.innerText = convertName(songData.name);

                const inp = document.createElement("p");
                inp.innerText = convertName(songData.primaryArtists + ", " + songData.featuredArtists)

                inDiv.append(inH4);
                inDiv.append(inp);
                queue09.append(inDiv);

                queue06.append(queue07);
                queue06.append(queue08);
                queue06.append(queue09);
                queue06.onclick = playSelectedFromQueue.bind({ data: val, index: i });

                queuePlaylist.append(queue06);
            }
        }
    } else {
        queueStack.style.display = "none";
    }
}
async function playSelectedFromQueue() {
    musicPlayerData.currentSong = this.data;
    musicPlayerData.songIndex = this.index;
    await playMusicPlayer();
    await loadQueueData();
}

function handleImageQueue() {
    if (window.innerWidth < 600) {
        handleQueueOpen();
    }
}
