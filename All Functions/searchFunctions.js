
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
