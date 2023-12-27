function handleopenPlaylistFromSide(event) {
    event.stopPropagation();
    const playlist14 = event.target.closest(".playlist14");
    playlist14.innerHTML = "";

    const div1 = document.createElement("div");

    const playlist15 = document.createElement("div");
    playlist15.className = "playlist15";
    playlist15.onclick = handlebackPlaylistFromSide;

    const div2 = document.createElement("div");
    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-chevron-left fa-sm";
    div2.appendChild(i1);
    playlist15.appendChild(div2);

    const playlist17 = document.createElement("div");
    playlist17.className = "playlist17";
    playlist17.innerText = "Back";

    playlist15.append(playlist17);
    div1.append(playlist15);

    const hr1 = document.createElement("hr");
    div1.append(hr1);
    const playlist15_01 = document.createElement("div");
    playlist15_01.className = "playlist15";
    playlist15_01.onclick = addPlaylist;

    const playlist17_01 = document.createElement("div");
    playlist17_01.className = "playlist17";

    playlist17_01.innerText = "+ New Playlist";
    playlist15_01.append(playlist17_01);
    div1.append(playlist15_01);

    const hr2 = document.createElement("hr");
    div1.append(hr2);

    for (let i = 0; i < myPlaylistData.data.length; i++) {
        const playlist15_02 = document.createElement("div");
        playlist15_02.className = "playlist15";
        playlist15_02.onclick = handleMyPlaylistRoute.bind(myPlaylistData.data[i]); // routes.js

        const playlist17_02 = document.createElement("div");
        playlist17_02.className = "playlist17";

        playlist17_02.innerText = myPlaylistData.data[i].name;
        playlist15_02.append(playlist17_02);
        div1.append(playlist15_02);
    }

    playlist14.append(div1);
}

function handlebackPlaylistFromSide(event) {
    event.stopPropagation();
    const playlist14 = event.target.closest(".playlist14");
    playlist14.innerHTML = "";

    const div1 = document.createElement("div");

    [
        { name: "Liked", events: handleLikeRoute, iClass: "fa-solid fa-heart" },
        { name: "History", events: handleHistoryRoute, iClass: "fa-solid fa-clock-rotate-left" },
        { name: "My Playlist", events: handleLikeRoute, iClass: "fa-brands fa-itunes-note" },
    ].forEach((item) => {
      
        const playlist15 = document.createElement("div");
        playlist15.className = "playlist15";
        playlist15.onclick = item.events;

        const playlist16 = document.createElement("div");
        playlist16.className = "playlist16 side06";

        const i1 = document.createElement("i");
        i1.className = item.iClass;
        i1.style.color = "white";

        playlist16.append(i1);
        playlist15.append(playlist16);

        const playlist17 = document.createElement("div");
        playlist17.className = "playlist17";
        playlist17.innerText = item.name;

        playlist15.append(playlist17);
        div1.append(playlist15);
    });

    playlist14.append(div1);
}
