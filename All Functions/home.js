const loadSongs = async () => {
    mainContainer.innerHTML = "";
    const list = await axios.get(`https://saavn.dev/modules?language=${localLanguages.toString()}`);
    const homeData = list.data.data;

    for (let key in homeData) {
        const catMainTitle = document.createElement("div");
        catMainTitle.classList.add("cat-main-title");

        const h2Title = document.createElement("h2");
        h2Title.innerText = `top ${key}`;

        catMainTitle.append(h2Title);
        mainContainer.append(catMainTitle);

        const cat01 = document.createElement("div");
        cat01.classList.add("cat-01");

        if (Array.isArray(homeData[key])) {
            createListItems(homeData[key], cat01);
        } else {
            const inData = homeData[key];
            for (let innerKey in inData) {
                createListItems(inData[innerKey], cat01);
            }
        }

        mainContainer.append(cat01);
    }
};

function createListItems(data, cat01, type) {
    for (let i = 0; i < data.length; i++) {
        let list = {};
        if (type === "song-yml") {
            list = { ...data[i], type: "song" };
        } else {
            list = data[i];
        }

        const listMain = document.createElement("div");
        listMain.classList.add("listmain");
        listMain.setAttribute("tabindex", 0);

        const mainDiv = document.createElement("div");

        const imgdiv = document.createElement("div");
        imgdiv.className = "imgDiv";

        const listImage = document.createElement("div");
        listImage.classList.add("listImage");
        if (list.type === "artist") {
            listImage.style.borderRadius = "50%";
        }

        const listimg = document.createElement("img");
        listimg.src = Array.isArray(list.image) ? list.image[2].link : list.image;
        listImage.append(listimg);

        imgdiv.append(listImage);
        mainDiv.append(imgdiv);

        const listBtns = document.createElement("div");
        listBtns.className = "listBtns";

        addEventListenerList(listBtns, list);

        const listHov = document.createElement("div");
        listHov.className = "listhov save-library";

        const listabs = document.createElement("div");
        listabs.className = "listabs";

        const listabs2 = document.createElement("div");
        listabs2.className = "listabs listhovflex";

        const listplaybtn = document.createElement("div");
        listplaybtn.className = "listplaybtn";
        listplaybtn.onclick = playCategory.bind(list);

        listabs2.append(listplaybtn);
        listabs.append(listabs2);

        const listabs3 = document.createElement("div");
        listabs3.className = "listabs listhovflex";
        listabs3.style.pointerEvents = "none";

        const listi1 = document.createElement("i");
        listi1.className = "fa-solid fa-play fa-sm";
        listi1.style.color = "white";

        listabs3.append(listi1);
        listabs.append(listabs3);
        listHov.append(listabs);
        if (list.type !== "artist") {
            const div1 = document.createElement("div");

            const i1 = document.createElement("i");
            i1.onclick = handleLike.bind(list);

            if (likedData[list.type].some((val) => val.id === list.id)) {
                i1.className = "fa-solid fa-heart fa-lg";
            } else {
                i1.className = "fa-regular fa-heart fa-lg";
            }

            div1.appendChild(i1);
            listHov.append(div1);

            const div2 = document.createElement("div");
            div2.className = "options";
            div2.onclick = loadOptions.bind(list);

            const i2 = document.createElement("i");

            i2.style.color = "white";
            i2.className = "fa-solid fa-ellipsis fa-lg";

            div2.appendChild(i2);
            listHov.append(div2);
            const div3 = document.createElement("div");
            div3.className = "optionsDiv";
            listHov.append(div3);
        }

        listBtns.append(listHov);
        listImage.append(listBtns);

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");

        const titleh4 = document.createElement("h4");
        titleh4.innerText = convertName(list.name ? list.name : list.title);

        listTitle.append(titleh4);

        const titleP = document.createElement("p");
        titleP.innerText = convertName(
            type === "topTrend"
                ? list.subtitle
                : type === "search"
                ? list.description
                : list.type === "album"
                ? list.artists
                    ? Array.isArray(list.artists)
                        ? convertArtistToString(list.artists)
                        : list.artists
                    : list.subtitle
                : list.type === "song"
                ? list.primaryArtists
                    ? Array.isArray(list.primaryArtists)
                        ? convertArtistToString(list.primaryArtists)
                        : list.primaryArtists
                    : list.subtitle
                : list.type !== "artist"
                ? list.subtitle
                : ""
        );

        listTitle.append(titleP);

        mainDiv.append(listTitle);
        listMain.append(mainDiv);
        cat01.append(listMain);
    }
}

function addEventListenerList(btn, data) {
    let isLongPress = false;
    let longPressTimer = null;
    btn.addEventListener("click", () => {
        if (!isLongPress) {
            openDetails.bind(data)();
        }
        isLongPress = false;
    });

    btn.addEventListener("mousedown", function (event) {
        longPressTimer = setTimeout(function () {
            loadOptions.bind(data)(event);
            isLongPress = true;
        }, 500);
    });

    btn.addEventListener("mouseup", function () {
        clearTimeout(longPressTimer);
    });

    btn.addEventListener("touchstart", function (event) {
        longPressTimer = setTimeout(function () {
            loadOptions.bind(data)(event);
            isLongPress = true;
        }, 500);
    });

    btn.addEventListener("touchend", function () {
        clearTimeout(longPressTimer);
    });
}
