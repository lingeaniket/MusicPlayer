function loadHeadDetails(player, type, id, details01_1) {
    const details02 = document.createElement("div");
    details02.className = "details02";

    const details03 = document.createElement("div");
    details03.className = "details03";

    const details04 = document.createElement("div");
    details04.className = "details04";

    const img04 = document.createElement("img");
    img04.src = player.image[2].link;

    details04.append(img04);
    details03.append(details04);
    details02.append(details03);

    const details05 = document.createElement("div");
    details05.className = "details05";

    const details06 = document.createElement("div");
    details06.className = "details06";

    const h206 = document.createElement("h2");
    h206.innerText = convertName(player.name);

    details06.append(h206);

    const div06_01 = document.createElement("div");

    const p06_01 = document.createElement("p");

    const dot_01 = document.createElement("i");
    dot_01.className = "fa-solid fa-circle fa-2xs";
    dot_01.style.margin = "0 6px";
    dot_01.style.fontSize = "5px";
    dot_01.style.verticalAlign = "middle";

    if (type === "song" || type == "album") {
        const spn01 = document.createElement("span");
        // spn01.innerText = convertName(`${player.primaryArtists}${player.featuredArtists ? ", " + player.featuredArtists : ""}`);
        spn01.innerText = player.subtitle;
        p06_01.append(spn01);
        p06_01.append(dot_01);

        const spn02 = document.createElement("span");
        if (type === "song") {
            spn02.innerText = player.play_count?.toLocaleString() + " plays";
        } else {
            spn02.innerText = findPlays(player.songs).toLocaleString() + " plays";
        }
        p06_01.append(spn02);
    }
    // else if (type === "album") {
    //     p06_01.innerHTML = convertName(`${player.primaryArtists} ${convertArtistToString(player.featuredArtists)}`);
    // }
    else {
        const spn01 = document.createElement("span");
        spn01.innerText = `${player.follower_count} followers`;
        p06_01.append(spn01);
        p06_01.append(dot_01);
        const spn02 = document.createElement("span");
        spn02.innerText = `${player.fan_count} fans`;
        p06_01.append(spn02);
    }

    div06_01.append(p06_01);
    details06.append(div06_01);

    const div06_02 = document.createElement("div");

    const p06_02 = document.createElement("p");
    p06_02.innerText =
        type === "song"
            ? `${player.copyright_text}`
            : type === "album"
            ? `${player.song_count} Song${player.song_count > 1 ? "s" : ""}`
            : type === "artist"
            ? `${player.dominant_language}, ${player.dominant_type}`
            : `${player.firstname} ${player.lastname}`;

    div06_02.append(p06_02);
    details06.append(div06_02);
    details05.append(details06);

    const details07 = document.createElement("div");
    details07.className = "details07 save-library";

    const div07_01 = document.createElement("div");
    const btn07_01 = document.createElement("button");
    btn07_01.innerText = "Play";

    btn07_01.onclick = playCategory.bind({ type, id }); // musicPlayer.js 1

    div07_01.append(btn07_01);
    details07.append(div07_01);

    const div07_02 = document.createElement("div");
    const btn07_02 = document.createElement("button");

    const btn_i1 = document.createElement("i");

    if (likedData[type].some((val) => val === id)) {
        btn_i1.className = "fa-solid fa-heart fa-lg";
    } else {
        btn_i1.className = "fa-regular fa-heart fa-lg";
    }

    btn_i1.onclick = handleLike.bind({ ...player, type, id }); // commonFunctions.js

    btn07_02.append(btn_i1);
    div07_02.append(btn07_02);
    details07.append(div07_02);

    const div07_03 = document.createElement("div");
    const btn07_03 = document.createElement("button");
    btn07_03.onclick = loadOptions.bind({ ...player, type, id }); // comonFunctions.js

    const btn_i2 = document.createElement("i");
    btn_i2.className = "fa-solid fa-ellipsis fa-xl";

    const div2 = document.createElement("div");
    div2.className = "optionsDiv";

    btn07_03.append(btn_i2);
    btn07_03.append(div2);
    div07_03.append(btn07_03);
    details07.append(div07_03);
    details05.append(details07);
    details02.append(details05);
    details01_1.append(details02);
}

function loadMainDetails(playerSongs, type, id, div1) {
    if (playerSongs.length - 1 > 0) {
        const details08 = document.createElement("div");
        details08.className = "details08";

        if (type === "song") {
            const h41 = document.createElement("h4");

            h41.innerText = "More songs from album";
            details08.append(h41);
        }

        div1.append(details08);

        const details09 = document.createElement("div");
        details09.className = "details09";
        details09.id = "songList";
        songList = details09;

        let newIndex = 0;

        for (let i = 0; i < playerSongs.length; i++) {
            if (type === "song" && playerSongs[i].id == id) {
                newIndex--;
                continue;
            }
            loadSongList(details09, playerSongs[i], "", i + newIndex); // commonFunctions.js 153
        }

        if (!lastpage) {
            const div2 = document.createElement("div");
            div2.className = "loadMore";
            div2.id = "loadMoreButton";
            const btn1 = document.createElement("button");
            btn1.className = "loadMoreBtn";
            btn1.innerText = "Load more";
            btn1.onclick = loadMoreSongs.bind({ id }); // getDetailsGenerator.js
            div2.append(btn1);
            details09.append(div2);
        }
        div1.append(details09);
    }
}
