let currentViewSongs = [];
let currentviewPage = 1;
let currentViewAlbums = [];
let currentViewPlaylists = [];
let currentViewArtists = [];

async function loadLiked() {
    mainContainer.innerHTML = "";
    const cat1 = document.createElement("div");
    cat1.className = "cat-01";
    if (likedData.song.length > 0) {
        createListItems(likedData.song, cat1);
        mainContainer.append(cat1);
    } else {
        mainContainer.innerHTML = "No liked songs";
    }
}
