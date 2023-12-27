

async function addPlaylist() {
    const lastPlaylist = myPlaylistData.lastId;
    const obj = { name: `Playlist#${lastPlaylist + 1}`, id: new Date().getTime(), songs: [] };
    myPlaylistData.data.push(obj);
    updatePlaylist();
    myPlaylistData.lastId++;

    localStorage.setItem("my-playlist-data", JSON.stringify(myPlaylistData));
}

function updatePlaylist() {
    playlist.innerHTML = "";
    for (let i = 0; i < myPlaylistData.data.length; i++) {
        const list = myPlaylistData.data[i];
        createPlaylistItem(playlist, list);
    }
}

function handleOpenPlaylist(event) {
    const parent = event.target.closest(".sideIcon");

    if (parent.classList.contains("playlistClose")) {
        parent.classList.remove("playlistClose");
    } else {
        parent.classList.add("playlistClose");
    }
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
    play05.append(h41);

    const p1 = document.createElement("p");
    p1.innerText = data.songs.length + " songs";

    play05.append(p1);
    play02.append(play05);
    parent.append(play02);
}
