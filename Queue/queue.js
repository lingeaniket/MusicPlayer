const queueSide = document.getElementById("queue-side");
const queueCurrent = document.getElementById("queue-current-song");
const queuePlaylist = document.getElementById("queue-playlist");

async function handleQueueOpen() {
    queueSide.classList.toggle("queue-open");
    mainContainer.classList.toggle("queue-added");

    if (!queueSide.classList.contains("queue-open") && musicPlayerData.currentSong) {
        await loadQueueData();
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
    para.innerText = currentSong.primaryArtists + ", " + currentSong.featuredArtists;

    queue03.append(head3);
    queue03.append(para);

    queueCurrent.append(queueMainImg);
    queueCurrent.append(queue03);

    for (let i = 0; i < musicPlayerData.songQueue.length; i++) {
        if (i > musicPlayerData.songIndex) {
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
            const data = await axios.get(`https://saavn.me/songs?id=${val}`);
            const songData = data.data.data[0];
            qImg.src = songData.image[2].link;

            queue08.append(qImg);

            const queue09 = document.createElement("div");
            queue09.classList.add("queue09");

            const inDiv = document.createElement("div");

            const inH4 = document.createElement("h4");
            inH4.innerText = songData.name.replace(/&quot;/g, '"');

            const inp = document.createElement("p");
            inp.innerText = songData.primaryArtists + ", " + songData.featuredArtists;

            inDiv.append(inH4);
            inDiv.append(inp);
            queue09.append(inDiv);

            queue06.append(queue07);
            queue06.append(queue08);
            queue06.append(queue09);
            queue06.onclick = playSelectedFromQueue.bind({ id: val, index: i });

            queuePlaylist.append(queue06);
        }
    }

    async function playSelectedFromQueue() {
        musicPlayerData.currentSong = this.id;
        musicPlayerData.songIndex = this.index;
        await playMusicPlayer();
        await loadQueueData();
    }
}

const newData = {
    id: "5WXAlMNt",
    name: "Thunderclouds",
    album: {
        id: "13615087",
        name: "Thunderclouds",
        url: "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_",
    },
    year: "2018",
    releaseDate: "2018-08-09",
    duration: "187",
    label: "Records/Columbia",
    primaryArtists: "Lsd",
    primaryArtistsId: "1153577",
    featuredArtists: "Sia, Diplo, Labrinth, Sia, Diplo, And Labrinth",
    featuredArtistsId: "568707, 599061, 577223, 4799650",
    explicitContent: 0,
    playCount: 8822136,
    language: "english",
    hasLyrics: "false",
    url: "https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc",
    copyright: "(P) 2018 RECORDS, LLC / Columbia",
    image: [
        {
            quality: "50x50",
            link: "https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-50x50.jpg",
        },
        {
            quality: "150x150",
            link: "https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-150x150.jpg",
        },
        {
            quality: "500x500",
            link: "https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-500x500.jpg",
        },
    ],
    downloadUrl: [
        {
            quality: "12kbps",
            link: "https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_12.mp4",
        },
        {
            quality: "48kbps",
            link: "https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_48.mp4",
        },
        {
            quality: "96kbps",
            link: "https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_96.mp4",
        },
        {
            quality: "160kbps",
            link: "https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_160.mp4",
        },
        {
            quality: "320kbps",
            link: "https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_320.mp4",
        },
    ],
};
