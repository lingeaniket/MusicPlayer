const playlist = document.getElementById("your-playlists");
async function addPlaylist() {
    const lastPlaylist = myPlaylistData.lastId;
    const obj = { name: `Playlist#${lastPlaylist + 1}`, id: new Date().getTime(), songs: [] };
    myPlaylistData.data.push(obj);
    updatePlaylist()
    myPlaylistData.lastId++;

    localStorage.setItem("my-playlist-data", JSON.stringify(myPlaylistData));
}

function backToPlaylist(event) {
    if (event.target) {
        event.stopPropagation();
    }

    setTimeout(() => {
        let parentNode = null;
        if (event.target) {
            parentNode = event.target.parentNode;
        } else {
            parentNode = event;
        }
        parentNode.innerHTML = "";

        const div1 = document.createElement("div");
        if (likedData[this.type].some((val) => val.id === this.id)) {
            div1.innerText = "Remove from Library";
        } else {
            div1.innerText = "Save to Library";
        }
        div1.onclick = handleLikeFromOptions.bind(this);
        parentNode.append(div1);

        const div2 = document.createElement("div");
        div2.style.textTransform = "capitalize";
        div2.innerText = `Play ${this.type} Now`;
        div2.onclick = playCategory.bind(this);
        parentNode.append(div2);

        const div3 = document.createElement("div");
        div3.innerText = "Add to Queue";
        parentNode.append(div3);

        const div4 = document.createElement("div");

        const div5 = document.createElement("div");
        div5.innerText = "Add to Playlist";
        div4.append(div5);

        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-chevron-right fa-lg";
        div4.appendChild(i1);
        div4.onclick = handleAddToPlaylist.bind(this);
        parentNode.append(div4);
    }, 10);
}

function handleAddToPlaylist(event) {
    event.stopPropagation();

    setTimeout(() => {
        // console.log(event.target)
        const parentNode = event.target.parentNode;
        parentNode.innerHTML = "";
        const div1 = document.createElement("div");
        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-chevron-left fa-lg";

        // div1.append(i1);
        const div11 = document.createElement("div");
        div1.onclick = backToPlaylist.bind(this);

        const span1 = document.createElement("span");
        span1.innerText = "Back";
        span1.style.marginLeft = "15px";
        div11.append(i1);
        div11.append(span1);

        div1.append(div11);
        parentNode.append(div1);

        const hr1 = document.createElement("hr");
        parentNode.append(hr1);
        const div2 = document.createElement("div");
        div2.innerText = "+ New Playlist";
        div2.onclick = addPlaylist;

        const hr2 = document.createElement("hr");
        parentNode.append(div2);
        parentNode.append(hr2);

        for (let i = 0; i < myPlaylistData.data.length; i++) {
            const div3 = document.createElement("div");
            div3.innerText = myPlaylistData.data[i].name;
            div3.onclick = addCategoryToPlaylist.bind({ type: this.type, id: this.id, index: i });
            parentNode.append(div3);
        }
    }, 10);
}

function updatePlaylist() {
    playlist.innerHTML = "";
    for (let i = 0; i < myPlaylistData.data.length; i++) {
        const list = myPlaylistData.data[i];
        createPlaylistItem(playlist, list);
    }
    // for(let)
}

function createPlaylistItem(parent, data) {
    const play02 = document.createElement("div");
    play02.className = "playlist02";
    play02.onclick = handleMyPlaylistRoute.bind(data);
    const play03 = document.createElement("div");
    play03.className = "playlist03";
    for (let i = data.songs.length - 1; i >= data.songs.length - 4; i--) {
        const play04 = document.createElement("div");
        play04.className = "playlist04";

        if (data.songs[i]) {
            const img1 = document.createElement("img");
            img1.src = Array.isArray(data.songs[i].image) ? data.songs[i].image[2].link : data.songs[i].image;
            play04.append(img1);
        } else {
            const i1 = document.createElement("i");
            i1.className = "fa-brands fa-itunes-note fa-2xs";
            // <i class="fa-brands fa-itunes-note fa-2xs" style="color: #ffffff;"></i>
            i1.style.color = "#ffffff";
            play04.append(i1);
        }
        play03.append(play04);
    }
    play02.append(play03);

    const play05 = document.createElement("div");
    play05.className = "playlist05";

    const h41 = document.createElement("h5");
    h41.innerText = data.name;
    const p1 = document.createElement("p");
    p1.innerText = data.songs.length + " songs";
    play05.append(h41);
    play05.append(p1);
    play02.append(play05);
    parent.append(play02);
}

function loadPlaylist() {
    updatePlaylist();
}

async function addCategoryToPlaylist(event) {
    event.stopPropagation();
    if (this.type === "song") {
        const songData = await axios.get(`https://saavn.me/songs?id=${this.id}`);
        const song = songData.data.data[0];
        addSongToPlaylist.bind(song)(this.index);
    } else if (this.type === "playlist" || this.type === "album") {
        const songData = await axios.get(`https://saavn.me/${this.type}s?id=${this.id}`);
        const songs = songData.data.data.songs;
        for (let i = 0; i < songs.length; i++) {
            addSongToPlaylist.bind(songs[i])(this.index);
        }
    }
    closeForceOptions();
    // console.log(myPlaylistData)
    localStorage.setItem("my-playlist-data", JSON.stringify(myPlaylistData));
    updatePlaylist();
}

function addSongToPlaylist(index) {
    const { id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type: "song", id, image, primaryArtists, artists, name, title, subtitle };

    myPlaylistData.data[index].songs.push(obj);
    console.log(myPlaylistData.data[index].songs);
}

function loadMyPlaylist() {
    const searchquerey = window.location.search;
    const query = new URLSearchParams(searchquerey);
    const id = query.get("id");
    const url = new URL(window.location.href);
    url.searchParams.set("id", id);
    window.history.replaceState({}, "", url);

    const playlistData = myPlaylistData.data.find((val) => val.id === Number(id));

    const songs = playlistData.songs;

    const playlist06 = document.createElement("div");
    playlist06.className = "playlist06";
    const playlist07 = document.createElement("div");
    playlist07.className = "playlist07";
    const playlist08 = document.createElement("div");
    playlist08.className = "playlist08";

    for (let i = songs.length - 1; i >= songs.length - 4; i--) {
        const playlist09 = document.createElement("div");
        playlist09.className = "playlist09";
        if (songs[i]) {
            const img1 = document.createElement("img");
            img1.src = Array.isArray(songs[i].image) ? songs[i].image[2].link : songs[i].image;
            playlist09.append(img1);
        } else {
            const i1 = document.createElement("i");
            i1.className = "fa-brands fa-itunes-note fa-xl";
            i1.style.color = "#ffffff";
            playlist09.append(i1);
        }
        playlist08.append(playlist09);
    }
    playlist07.append(playlist08);
    const playlist11 = document.createElement("div");
    playlist11.className = "playlist11";
    const playlist12 = document.createElement("h1");
    playlist12.className = "playlist12";

    playlist12.innerText = playlistData.name;
    playlist11.append(playlist12);

    const p12 = document.createElement("p");
    p12.innerText = songs.length + " songs";
    playlist11.append(p12);
    playlist07.append(playlist11);
    playlist06.append(playlist07);

    const playlist10 = document.createElement("hr");
    playlist10.className = "playlist10";
    playlist06.append(playlist10);
    const playlist13 = document.createElement("div");
    playlist13.className = "playlist13";

    for (let i = 0; i < songs.length; i++) {
        loadSongList(playlist13, songs[i], "", i);
    }
    playlist06.append(playlist13);
    mainContainer.append(playlist06);
}

function handleMyPlaylistRoute() {
    window.history.pushState({}, "", `/my-playlist/?id=${this.id}`);
    updateContent();
}

function handleopenPlaylistFromSide(event) {
    event.stopPropagation();
    const playlist14 = event.target.closest(".playlist14");
    playlist14.innerHTML = "";

    const div1 = document.createElement("div");

    const playlist15 = document.createElement("div");
    playlist15.className = "playlist15";
    playlist15.onclick = handlebackPlaylistFromSide;

    const div2 = document.createElement("div");
    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-chevron-left fa-sm";
    div2.appendChild(i1);
    playlist15.appendChild(div2);

    const playlist17 = document.createElement("div");
    playlist17.className = "playlist17";
    playlist17.innerText = "Back";

    playlist15.append(playlist17);
    div1.append(playlist15);

    const hr1 = document.createElement("hr");
    div1.append(hr1);
    const playlist15_01 = document.createElement("div");
    playlist15_01.className = "playlist15";
    playlist15_01.onclick = addPlaylist;

    const playlist17_01 = document.createElement("div");
    playlist17_01.className = "playlist17";

    playlist17_01.innerText = "+ New Playlist";
    playlist15_01.append(playlist17_01);
    div1.append(playlist15_01);
    const hr2 = document.createElement("hr");
    div1.append(hr2);

    for (let i = 0; i < myPlaylistData.data.length; i++) {
        const playlist15_02 = document.createElement("div");
        playlist15_02.className = "playlist15";
        playlist15_02.onclick = handleMyPlaylistRoute.bind(myPlaylistData.data[i]);

        const playlist17_02 = document.createElement("div");
        playlist17_02.className = "playlist17";

        playlist17_02.innerText = myPlaylistData.data[i].name;
        playlist15_02.append(playlist17_02);
        div1.append(playlist15_02);
    }

    playlist14.append(div1);
}

function handlebackPlaylistFromSide(event) {
    event.stopPropagation();
    const playlist14 = event.target.closest(".playlist14");
    console.log(playlist14);
    playlist14.innerHTML = "";

    const div1 = document.createElement("div");

    const playlist15_01 = document.createElement("div");
    playlist15_01.className = "playlist15";
    playlist15_01.onclick = handleLikeRoute;
    const playlist16_01 = document.createElement("div");
    playlist16_01.className = "playlist16 side06";
    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-heart";
    i1.style.color = "white";
    playlist16_01.append(i1);
    playlist15_01.append(playlist16_01);
    const playlist17_01 = document.createElement("div");
    playlist17_01.className = "playlist17";
    playlist17_01.innerText = "Liked";
    playlist15_01.append(playlist17_01);
    div1.append(playlist15_01);

    const playlist15_02 = document.createElement("div");
    playlist15_02.className = "playlist15";
    playlist15_02.onclick = handleHistoryRoute;
    const playlist16_02 = document.createElement("div");
    playlist16_02.className = "playlist16 side06";
    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-clock-rotate-left";
    i2.style.color = "white";
    playlist16_02.append(i2);
    playlist15_02.append(playlist16_02);

    const playlist17_02 = document.createElement("div");
    playlist17_02.className = "playlist17";
    playlist17_02.innerText = "History";
    playlist15_02.append(playlist17_02);
    div1.append(playlist15_02);

    const playlist15_03 = document.createElement("div");
    playlist15_03.className = "playlist15";
    playlist15_03.onclick = handleopenPlaylistFromSide;
    const playlist16_03 = document.createElement("div");
    playlist16_03.className = "playlist16 side06";
    const i3 = document.createElement("i");
    i3.className = "fa-brands fa-itunes-note";
    i3.style.color = "white";
    playlist16_03.append(i3);
    playlist15_03.append(playlist16_03);

    const playlist17_03 = document.createElement("div");
    playlist17_03.className = "playlist17";
    playlist17_03.innerText = "My Playlist";
    playlist15_03.append(playlist17_03);
    div1.append(playlist15_03);

    playlist14.append(div1);
}
