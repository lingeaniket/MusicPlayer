const playlist = document.getElementById("your-playlists");
async function addPlaylist() {
    const lastPlaylist = myPlaylistData.lastId;
    const obj = { name: `Playlist#${lastPlaylist + 1}`, songs: [] };
    myPlaylistData.data.push(obj);
    const inHtml = playlist.innerHTML;
    playlist.innerHTML = "";
    createPlaylistItem(playlist, obj);
    playlist.append(inHtml);
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
    const play03 = document.createElement("div");
    play03.className = "playlist03";
    for (let i = 0; i < 4; i++) {
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
