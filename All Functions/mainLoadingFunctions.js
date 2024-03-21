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
    searchInput.oninput = handleInput; // searchFunctions.js 1

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

    await loadTopTrends(); // searchFunctions.js 88
}

async function loadDetails() {
    const searchquerey = window.location.search;

    const query = new URLSearchParams(searchquerey);

    const type = query.get("type");
    const id = query.get("id");

    const url = new URL(window.location.href);

    url.searchParams.set("type", type);
    url.searchParams.set("id", id);

    window.history.replaceState({}, "", url);

    const playerData = await axios.get(`https://jio-saavn-api.onrender.com/${type}?id=${id}`);
    const modules = playerData.data.data.modules;
    console.log(playerData.data.data.modules);

    if (type === "artist") {
        const songs = await axios.get(`https://jio-saavn-api.onrender.com/artist/${id}/songs?page=1`);

        playerSongs = songs.data.data.results;
        lastpage = songs.data.data.lastpage;
        totalSongs = songs.data.data.total;
        currentPage = 1;
        player = playerData.data.data;
    } else if (type === "song") {
        player = playerData.data.data.songs[0];
        const albumid = player.album_id;

        const albumdata = await axios.get(`https://jio-saavn-api.onrender.com/album?id=${albumid}`);

        playerSongs = albumdata.data.data.songs;
        currentPage = 0;
        lastpage = true;
        totalSongs = 0;
    } else {
        player = playerData.data.data;
        playerSongs = player.songs;
        totalSongs = 0;
        currentPage = 0;
        lastpage = true;
    }

    const details01 = document.createElement("div");
    details01.className = "details01";

    const details01_1 = document.createElement("div");

    loadHeadDetails(player, type, id, details01_1); // getDetails.js 1

    const div1 = document.createElement("div");

    loadMainDetails(playerSongs, type, id, div1); // getDetails.js 128

    details01_1.append(div1);

    const details03_01 = document.createElement("div");
    details03_01.className = "details03";
    details03_01.id = "details-rec-01";
    details01_1.append(details03_01);

    const details03_02 = document.createElement("div");
    details03_02.className = "details03";
    details03_02.id = "details-rec-02";
    details01_1.append(details03_02);

    details01_1.id = "details-01-div";
    details01.append(details01_1);
    mainContainer.append(details01);

    loadRecommendations(type, modules); // getRecoComponents.js 01
}
