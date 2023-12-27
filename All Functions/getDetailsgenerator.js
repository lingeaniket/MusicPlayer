async function loadMoreSongs() {
    currentPage++;
    const songs = await axios.get(`https://saavn.me/artists/${this.id}/songs?page=${currentPage}`);
    lastpage = songs.data.data.lastpage;

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
