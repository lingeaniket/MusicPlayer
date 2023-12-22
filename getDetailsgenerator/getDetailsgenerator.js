let player = "";
let playerSongs = "";
let totalSongs = "";
let currentPage = 0;
let lastpage = true;

let songList = null;
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

    if (type === "artist") {
        const songs = await axios.get(`https://saavn.me/artists/${id}/songs?page=1`);
        playerSongs = songs.data.data.results;
        lastpage = songs.data.data.lastpage;
        totalSongs = songs.data.data.total;
        currentPage = 1;
        player = playerData.data.data;
    } else if (type === "song") {
        player = playerData.data.data[0];
        const albumid = player.album.id;
        const albumdata = await axios.get(`https://saavn.me/albums?id=${albumid}`);

        playerSongs = albumdata.data.data.songs;

        currentPage = 0;
        lastpage = true;
        totalSongs = 0;
    } else {
        player = playerData.data.data;
        playerSongs = player.songs;
        totalSongs = 0;
        currentPage = 0;
        lastpage = true;
    }

    const details01 = document.createElement("div");
    details01.className = "details01";

    const details01_1 = document.createElement("div");

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

    const dot_01 = document.createElement("i");
    dot_01.className = "fa-solid fa-circle fa-2xs";
    dot_01.style.margin = "0 6px";
    dot_01.style.fontSize = "5px";
    dot_01.style.verticalAlign = "middle";
    if (type === "song") {
        const spn01 = document.createElement("span");
        spn01.innerText = `${player.primaryArtists}${player.featuredArtists ? ", " + player.featuredArtists : ""}`;
        p06_01.append(spn01);

        p06_01.append(dot_01);
        const spn02 = document.createElement("span");
        spn02.innerText = player.playCount + " plays";
        p06_01.append(spn02);
    } else if (type === "album") {
        p06_01.innerHTML = `${player.primaryArtists} ${convertArtistToString(player.featuredArtists)}`;
    } else {
        const spn01 = document.createElement("span");
        spn01.innerText = `${player.followerCount} followers`;
        p06_01.append(spn01);
        p06_01.append(dot_01);
        const spn02 = document.createElement("span");
        spn02.innerText = `${player.fanCount} fans`;
        p06_01.append(spn02);
    }

    div06_01.append(p06_01);
    details06.append(div06_01);

    const div06_02 = document.createElement("div");

    const p06_02 = document.createElement("p");
    p06_02.innerText =
        type === "song"
            ? `${player.copyright}`
            : type === "album"
            ? `${player.songCount} Song${player.songCount > 1 ? "s" : ""}`
            : type === "artist"
            ? `${player.dominantLanguage}, Fans : ${player.dominantType}`
            : `${player.firstname} ${player.lastname}`;

    div06_02.append(p06_02);
    details06.append(div06_02);
    details05.append(details06);

    const details07 = document.createElement("div");
    details07.className = "details07";

    const div07_01 = document.createElement("div");
    const btn07_01 = document.createElement("button");
    btn07_01.innerText = "Play";

    btn07_01.onclick = playCategory.bind({ type, id });

    div07_01.append(btn07_01);
    details07.append(div07_01);

    const div07_02 = document.createElement("div");
    const btn07_02 = document.createElement("button");

    const btn_i1 = document.createElement("i");

    if (likedData[type].some((val) => val === id)) {
        btn_i1.className = "fa-solid fa-heart fa-lg";
    } else {
        btn_i1.className = "fa-regular fa-heart fa-lg";
    }

    btn_i1.onclick = handleLike.bind({ type, id, ...player });

    btn07_02.append(btn_i1);
    div07_02.append(btn07_02);
    details07.append(div07_02);

    const div07_03 = document.createElement("div");
    const btn07_03 = document.createElement("button");
    const btn_i2 = document.createElement("i");
    btn_i2.className = "fa-solid fa-ellipsis fa-xl";

    btn07_03.append(btn_i2);
    div07_03.append(btn07_03);
    details07.append(div07_03);

    details05.append(details07);

    details02.append(details05);

    details01_1.append(details02);

    const div1 = document.createElement("div");

    if (playerSongs.length - 1 > 0) {
        const details08 = document.createElement("div");
        details08.className = "details08";
        if (type === "song") {
            const h41 = document.createElement("h4");

            h41.innerText = "More songs from album";
            details08.append(h41);
        }

        div1.append(details08);

        const details09 = document.createElement("div");
        details09.className = "details09";
        details09.id = "songList";
        songList = details09;

        let newIndex = 0;
        for (let i = 0; i < playerSongs.length; i++) {
            if (type === "song" && playerSongs[i].id == id) {
                newIndex--;
                continue;
            }
            loadSongList(details09, playerSongs[i], "", i + newIndex);
        }
        if (!lastpage) {
            const div2 = document.createElement("div");
            div2.className = "loadMore";
            div2.id = "loadMoreButton";
            const btn1 = document.createElement("button");
            btn1.className = "loadMoreBtn";
            btn1.innerText = "Load more";
            btn1.onclick = loadMoreSongs.bind({ id });
            div2.append(btn1);
            details09.append(div2);
        }
        div1.append(details09);
    }

    details01_1.append(div1);

    const details03_01 = document.createElement("div");
    details03_01.className = "details03";
    details03_01.id = "details-rec-01";
    details01_1.append(details03_01);

    const details03_02 = document.createElement("div");
    details03_02.className = "details03";
    details03_02.id = "details-rec-02";
    details01_1.append(details03_02);

    details01_1.id = "details-01-div";
    details01.append(details01_1);
    mainContainer.append(details01);

    loadRecommendations(type, player);
}

async function openDetails() {
    window.history.pushState({}, "", `/get-details/?type=${this.type}&id=${this.id}`);
    updateContent();
}

async function loadMoreSongs() {
    currentPage++;
    const songs = await axios.get(`https://saavn.me/artists/${this.id}/songs?page=${currentPage}`);
    lastpage = songs.data.data.lastpage;
    console.log(playerSongs);

    for (let i = 0; i < songs.data.data.results.length; i++) {
        loadSongList(songList, playerSongs[i], "", i + playerSongs.length);
    }
    playerSongs = [...playerSongs, ...songs.data.data.results];
    const moreButton = document.getElementById("loadMoreButton");
    songList.removeChild(moreButton);
    if (!lastpage) {
        const div2 = document.createElement("div");
        div2.className = "loadMore";
        div2.id = "loadMoreButton";
        const btn1 = document.createElement("button");
        btn1.className = "loadMoreBtn";
        btn1.innerText = "Load more";
        btn1.onclick = loadMoreSongs.bind({ id: this.id });
        div2.append(btn1);
        songList.append(div2);
    }
}
