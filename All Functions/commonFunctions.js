function loadOptions(event) {
    closeOptions(event);
    event.stopPropagation();
    const { top, left } = event.target.parentNode.getBoundingClientRect();

    const optionsDiv = event.target.parentNode.getElementsByClassName("optionsDiv")[0];
    optionsDiv.style.opacity = 1;
    optionsDiv.style.visibility = "visible";

    backToPlaylist.bind(this)(optionsDiv); //options.js

    if (top > window.innerHeight / 2) {
        optionsDiv.style.bottom = "10%";
    } else {
        optionsDiv.style.top = "100%";
    }

    if (left < window.innerWidth / 2) {
        optionsDiv.style.right = "-100%";
    } else {
        optionsDiv.style.right = "10%";
    }
}

function handleLikeFromOptions(event) {
    event.stopPropagation();
    const parent = event.target.closest(".save-library");

    const { type, id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type, id, image, primaryArtists, artists, name, title, subtitle };

    if (parent) {
        const heart = parent.querySelector(".fa-heart");
        if (heart) {
            if (heart.classList.contains("fa-regular")) {
                heart.classList.remove("fa-regular");
                heart.classList.add("fa-solid");
                likedData[type].push(obj);
                event.target.innerText = "Remove from Library";
            } else {
                heart.classList.add("fa-regular");
                heart.classList.remove("fa-solid");
                const index = likedData[type].findIndex((item) => item.id === id);
                likedData[type].splice(index, 1);

                event.target.innerText = "Save to Library";
            }
        }
    }
    localStorage.setItem("liked-data", JSON.stringify(likedData));
    closeForceOptions();
}

async function handleLike(event) {
    var buttonElement = event.target.closest("i");
    const { type, id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type, id, image, primaryArtists, artists, name, title, subtitle };

    event.stopPropagation();

    const classList = buttonElement.classList;

    if (classList.contains("fa-solid")) {
        buttonElement.classList.remove("fa-solid");
        buttonElement.classList.add("fa-regular");
        const index = likedData[type].findIndex((item) => item.id === id);
        likedData[type].splice(index, 1);
    } else {
        buttonElement.classList.add("fa-solid");
        buttonElement.classList.remove("fa-regular");
        likedData[type].push(obj);
    }
    localStorage.setItem("liked-data", JSON.stringify(likedData));
}

function closeForceOptions() {
    const containers = document.querySelectorAll(".options");
    const containersArray = Array.from(containers);

    for (let i = 0; i < containersArray.length; i++) {
        const val = containersArray[i];
        const optionsDiv = val.parentNode.getElementsByClassName("optionsDiv")[0];
        optionsDiv.style.visibility = "hidden";
        optionsDiv.style.opacity = 0;
    }
}

async function addCategoryToPlaylist(event) {
    event.stopPropagation();
    if (this.type === "song") {
        const songData = await axios.get(`https://saavn.me/songs?id=${this.id}`);

        const song = songData.data.data[0];

        addSongToPlaylist.bind(song)(this.index);
    } else if (this.type === "playlist" || this.type === "album") {
        const songData = await axios.get(`https://saavn.me/${this.type}s?id=${this.id}`);

        const songs = songData.data.data.songs;

        for (let i = 0; i < songs.length; i++) {
            addSongToPlaylist.bind(songs[i])(this.index);
        }
    }
    closeForceOptions();
    localStorage.setItem("my-playlist-data", JSON.stringify(myPlaylistData));
    updatePlaylist(); // playlistAccess.js
}

function addSongToPlaylist(index) {
    const { id, image, primaryArtists, artists, name, title, subtitle } = this;
    const obj = { type: "song", id, image, primaryArtists, artists, name, title, subtitle };

    myPlaylistData.data[index].songs.push(obj);
}

function formatTime(time) {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
}

function convertArtistToString(artists) {
    let titleString = "";
    artists.forEach((artist, idx) => {
        if (idx !== artists.length - 1) {
            titleString += artist.name + ", ";
        } else {
            titleString += artist.name;
        }
    });

    return convertName(titleString);
}

function convertName(name) {
    const sequenceMap = {
        "%20": " ",
        "%22": '"',
        "%27": "'",
        "%2C": ",",
        "%3F": "?",
        "&quot;": '"',
        "&amp;": "&",
    };

    return name.replace(/%20|%22|%27|%2C|%3F|&quot;|&amp;/g, (match) => sequenceMap[match]);
}

function loadSongList(maindiv, data, type, id) {
    const search17 = document.createElement("div");
    search17.className = "search17 save-library";

    const search18 = document.createElement("div");
    search18.className = "search18";

    const searchmain = document.createElement("div");
    searchmain.className = "search27";

    if (type !== "search") {
        const div1 = document.createElement("div");
        div1.className = "search22 song-id";

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
    search18_img.src = data.image[2].link.replace("http:", "https:");

    searchmain_01.append(search18_img);

    const hovPlay = document.createElement("div");
    hovPlay.className = "search25";

    hovPlay.onclick = playCategory.bind({ ...data, type: "song" }); // musicPlayer.js

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
    h320.innerText = convertName(type === "search" ? data.title : data.name);

    h320.onclick = openDetails.bind({ ...data, type: "song" }); // routes.js

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
    const search23 = document.createElement("div");
    search23.className = "search22";
    search23.onclick = loadOptions.bind({ ...data, type: "song" });

    const i23 = document.createElement("i");
    i23.className = "fa-solid fa-ellipsis fa-lg";
    const div1 = document.createElement("div");
    div1.className = "song-options";

    div1.innerText = formatTime(data.duration);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "optionsDiv";
    search23.append(i23);
    search23.append(optionsDiv);
    search23.append(div1);
    search17.append(search23);

    maindiv.append(search17);
}
