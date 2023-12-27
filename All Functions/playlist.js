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

