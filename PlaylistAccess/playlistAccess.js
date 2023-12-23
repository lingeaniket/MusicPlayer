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
    console.log("Playlist loaded");
}

{
    /* <div class="playlist02">
    <div class="playlist03">
        <div class="playlist04">
            <img src="" alt="123" />
        </div>
    </div>
    <div class="playlist05">
        <h4>Name</h4>
        <p>Songs</p>
    </div>
</div>; */
}
