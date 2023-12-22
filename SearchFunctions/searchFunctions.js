let searchResultsDiv = null;

let isSearching = false;
let searchkey = "";
let searchTimer = null;

async function loadSearch() {
    mainContainer.innerHTML = "";
    const search01 = document.createElement("div");
    search01.classList.add("search01");

    const search02 = document.createElement("div");
    search02.classList.add("search02");

    const search03 = document.createElement("div");
    search03.classList.add("search03");

    const search04_01 = document.createElement("button");
    search04_01.classList.add("search04");

    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-chevron-left fa-xs";

    search04_01.append(i1);
    search03.append(search04_01);

    const search04_02 = document.createElement("button");
    search04_02.classList.add("search04");

    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-chevron-right fa-xs";

    search04_02.append(i2);
    search03.append(search04_02);
    search02.append(search03);

    const search05 = document.createElement("div");
    search05.classList.add("search05");

    const searchInput = document.createElement("input");
    searchInput.classList.add("search-input");
    searchInput.type = "text";
    searchInput.placeholder = "What do you want to listen to?";
    searchInput.oninput = handleInput;

    search05.append(searchInput);

    const searchicon = document.createElement("div");
    searchicon.classList.add("search-icon-div");

    const i3 = document.createElement("i");
    i3.className = "fa-solid fa-magnifying-glass fa-xs";
    i3.style.color = "#ffffff";

    searchicon.append(i3);
    search05.append(searchicon);
    search02.append(search05);

    const search06 = document.createElement("div");
    search06.classList.add("search06");

    search02.append(search06);
    search01.append(search02);

    const search07 = document.createElement("div");
    search07.classList.add("search07");
    const search08 = document.createElement("div");
    search08.classList.add("search08");

    search08.id = "search-results-div";
    searchResultsDiv = search08;

    search07.append(search08);
    search01.append(search07);
    mainContainer.append(search01);

    await loadTopTrends();
}

async function handleInput(event) {
    searchkey = event.target.value;
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
    if (searchkey.length > 0) {
        searchTimer = setTimeout(() => {
            handleSearchkey();
        }, 1000);
    } else {
        await loadTopTrends();
    }
}

async function handleSearchkey() {
    searchResultsDiv.innerHTML = "";

    const searchData = await axios.get(`https://saavn.me/search/all?query=${searchkey}`);

    const searchResults = searchData.data.data;
    const topResult = searchResults.topQuery.results[0];
    const songsData = searchResults.songs.results;

    const search09 = document.createElement("div");
    search09.className = "search09";

    const h2Div = document.createElement("div");

    const h2main = document.createElement("h2");
    h2main.innerText = "Top Results";
    h2Div.append(h2main);
    search09.append(h2Div);

    const search10 = document.createElement("div");
    search10.className = "search10";

    const search11 = document.createElement("div");
    search11.className = "search11";

    const search11_img = document.createElement("img");
    search11_img.src = topResult.image[2].link;

    search11.append(search11_img);
    search10.append(search11);

    const search06 = document.createElement("div");
    search06.className = "search06";

    search10.append(search06);
    search09.append(search10);

    const search12 = document.createElement("div");
    search12.className = "search12";

    const h312 = document.createElement("h3");
    h312.innerText = topResult.title;

    search12.append(h312);

    const p12 = document.createElement("p");
    p12.innerText = topResult.description;

    search12.append(p12);
    search06.append(search12);

    const search13 = document.createElement("div");
    search13.className = "search13";

    search13.innerText = "Play";
    search13.onclick = playCategory.bind(topResult);

    search10.append(search13);
    searchResultsDiv.append(search09);

    const search09_01 = document.createElement("div");
    search09_01.className = "search09";

    loadSearchSongs(search09_01, songsData);

    searchResultsDiv.append(search09_01);

    loadCategory(searchResultsDiv, searchResults.albums.results, "Album");
    loadCategory(searchResultsDiv, searchResults.artists.results, "Artists");
    loadCategory(searchResultsDiv, searchResults.playlists.results, "Playlists");
}

async function loadTopTrends() {
    const search08 = document.getElementById("search-results-div");
    search08.innerHTML = "";

    const topTrendData = await axios.get("https://music-streaming-api.onrender.com/api/v1/music/get-topSearch");

    const topTrend = document.createElement("div");

    const ttH2 = document.createElement("h2");
    ttH2.style.margin = "10px 0";
    ttH2.innerText = "Top Trending";

    topTrend.append(ttH2);
    search08.append(topTrend);

    const cat01 = document.createElement("div");
    cat01.className = "cat-01";

    createListItems(topTrendData.data, cat01, "topTrend");

    search08.append(cat01);
}

function loadSearchSongs(maindiv, data) {
    //main div is search09 and data is array of songs
    const search14 = document.createElement("div");
    search14.className = "search14";

    const h214 = document.createElement("h2");
    h214.innerText = "Songs";

    search14.append(h214);

    const div14 = document.createElement("div");

    const search15 = document.createElement("div");
    search15.className = "search15";
    search15.innerText = "View all";

    div14.append(search15);
    search14.append(div14);
    maindiv.append(search14);

    const search16 = document.createElement("div");
    search16.className = "search16";

    for (let i = 0; i < data.length; i++) {
        loadSongList(search16, data[i], "search", i);
    }

    maindiv.append(search16);
}

function loadSongList(maindiv, data, type, id) {
    const search17 = document.createElement("div");
    search17.className = "search17";

    const search18 = document.createElement("div");
    search18.className = "search18";

    const searchmain = document.createElement("div");
    searchmain.className = "search27";

    if (type !== "search") {
        const div1 = document.createElement("div");
        div1.className = "search22";
        div1.style.fontSize = "14px";
        div1.style.fontWeight = "600";

        div1.innerText = id + 1;

        searchmain.append(div1);
        search18.append(searchmain);
        search17.append(search18);
    }

    const search18_01 = document.createElement("div");
    search18_01.className = "search18 searchImage";

    const searchmain_01 = document.createElement("div");
    searchmain_01.className = "search27";

    const search18_img = document.createElement("img");
    search18_img.src = data.image[2].link.replace("http:", "https")

    searchmain_01.append(search18_img);

    const hovPlay = document.createElement("div");
    hovPlay.className = "search25";

    hovPlay.onclick = playCategory.bind({ ...data, type: "song" });

    const search26 = document.createElement("div");
    search26.className = "search26";

    search26.style.backgroundColor = "#0000007e";

    const i3 = document.createElement("i");
    i3.className = "fa-solid fa-play fa-sm";
    i3.style.color = "white";

    search26.append(i3);
    hovPlay.append(search26);
    searchmain_01.append(hovPlay);
    search18_01.append(searchmain_01);
    search17.append(search18_01);

    const search24 = document.createElement("div");
    search24.className = "search24";

    const search19 = document.createElement("div");
    search19.className = "search19";

    const search20 = document.createElement("div");
    search20.className = "search20";

    const h320 = document.createElement("h3");
    h320.innerText = type === "search" ? data.title : data.name;

    h320.onclick = openDetails.bind({ ...data, type: "song" });

    search20.append(h320);
    search19.append(search20);

    const search21 = document.createElement("div");
    search21.className = "search21";

    const p21 = document.createElement("p");
    p21.innerText = data.primaryArtists;

    search21.append(p21);
    search19.append(search21);
    search24.append(search19);
    search17.append(search24);

    const search22 = document.createElement("div");
    search22.className = "search22";

    const i22 = document.createElement("i");
    i22.onclick = handleLike.bind({ ...data, type: "song" });
    if (likedData.song.some((val) => val.id === data.id)) {
        i22.className = "fa-solid fa-heart fa-lg";
    } else {
        i22.className = "fa-regular fa-heart fa-lg";
    }

    search22.append(i22);
    search17.append(search22);
    maindiv.append(search17);
}

function loadCategory(maindiv, data, type) {
    const search23 = document.createElement("div");
    search23.className = "search23";

    const h2Div = document.createElement("div");
    const h223 = document.createElement("h2");
    h223.innerText = type;

    h2Div.append(h223);
    search23.append(h2Div);

    const cat01 = document.createElement("div");
    cat01.className = "cat-01";

    createListItems(data, cat01, "search");

    search23.append(cat01);
    maindiv.append(search23);
}
