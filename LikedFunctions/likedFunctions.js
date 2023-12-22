let currentViewSongs = [];
let currentviewPage = 1;
let currentViewAlbums = [];
let currentViewPlaylists = [];
let currentViewArtists = [];

async function loadLiked() {
    mainContainer.innerHTML = "";

    const list01_01 = document.createElement("div");
    list01_01.className = "liked01";

    const list01_02 = document.createElement("div");
    list01_02.className = "liked01";

    const list02 = document.createElement("div");
    list02.className = "liked02";
    const list03 = document.createElement("div");
    list03.className = "liked03";

    const list01i = document.createElement("i");
    list01i.className = "fa-solid fa-heart";
    list01i.style.color = "white";
    list03.append(list01i);
    list02.append(list03);

    const list04 = document.createElement("div");
    list04.className = "liked04";

    const h101 = document.createElement("h1");
    h101.innerText = "Liked";
    list04.append(h101);
    list02.append(list04);
    list01_02.append(list02);

    const list05 = document.createElement("div");
    list05.className = "liked05";

    ["song", "album", "playlist", "artist"].forEach((val) => {
        const list06 = document.createElement("div");
        list06.className = "liked06";
        const list07 = document.createElement("div");
        list07.className = `liked07 ${val === "song" ? "selected" : ""}`;
        list07.innerText = val + "s";
        list07.onclick = loadSelectedCat.bind({ type: val });
        list06.append(list07);
        list05.append(list06);
    });

    list01_02.append(list05);
    const list08 = document.createElement("div");
    list08.className = "liked08";
    list08.id = "liked-data";

    const cat1 = document.createElement("div");
    cat1.className = "cat-01";
    if (likedData.song.length > 0) {
        createListItems(likedData.song, cat1);
        list08.append(cat1);
    } else {
        list08.innerHTML = "No liked songs";
    }
    list01_02.append(list08);
    list01_01.append(list01_02);
    mainContainer.appendChild(list01_01);

    // <div class="liked01">
    //     <div class="liked01">
    //         <div class="liked02">
    //             <div class="liked03">
    //                 <i class="fa-solid fa-heart" style="color: white"></i>
    //             </div>
    //             <div class="liked04">
    //                 <h1>Liked</h1>
    //             </div>
    //         </div>
    //         <div class="liked05">
    //             <div class="liked06">
    //                 <div class="liked07">Songs</div>
    //             </div>
    //             <div class="liked06">
    //                 <div class="liked07">Playlists</div>
    //             </div>
    //             <div class="liked06">
    //                 <div class="liked07">Albums</div>
    //             </div>
    //             <div class="liked06">
    //                 <div class="liked07">Artists</div>
    //             </div>
    //         </div>
    //         <div id="liked-data" class="liked08"></div>
    //     </div>
    // </div>;
}

function loadSelectedCat(event) {
    // event.target
    const likedDiv = document.getElementById("liked-data");
    const liked = document.getElementsByClassName("selected")[0];
    liked.classList.remove("selected");
    likedDiv.innerHTML = "";
    const { type } = this;
    event.target.classList.add("selected");

    const cat1 = document.createElement("div");
    cat1.className = "cat-01";
    if (likedData[type].length > 0) {
        createListItems(likedData[type], cat1);
        likedDiv.append(cat1);
    } else {
        likedDiv.innerHTML = "No liked songs";
    }
}
