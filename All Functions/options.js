function backToPlaylist(event) {
    if (event.target) {
        event.stopPropagation();
    }

    setTimeout(() => {
        let parentNode = null;
        if (event.target) {
            parentNode = event.target.parentNode;
        } else {
            parentNode = event;
        }
        parentNode.innerHTML = "";

        const div1 = document.createElement("div");

        if (likedData[this.type].some((val) => val.id === this.id)) {
            div1.innerText = "Remove from Library";
        } else {
            div1.innerText = "Save to Library";
        }

        div1.onclick = handleLikeFromOptions.bind(this);
        parentNode.append(div1);

        const div2 = document.createElement("div");
        div2.style.textTransform = "capitalize";
        div2.innerText = `Play ${this.type} Now`;
        div2.onclick = playCategory.bind(this);
        parentNode.append(div2);

        const div3 = document.createElement("div");
        div3.innerText = "Add to Queue";
        parentNode.append(div3);

        const div4 = document.createElement("div");

        const div5 = document.createElement("div");
        div5.innerText = "Add to Playlist";
        div4.append(div5);

        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-chevron-right fa-lg";
        div4.appendChild(i1);
        div4.onclick = handleAddToPlaylist.bind(this); // same file 50
        parentNode.append(div4);
    }, 10);
}

function handleAddToPlaylist(event) {
    event.stopPropagation();

    setTimeout(() => {
        const parentNode = event.target.parentNode;
        parentNode.innerHTML = "";
        const div1 = document.createElement("div");

        const div11 = document.createElement("div");
        div11.onclick = backToPlaylist.bind(this);

        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-chevron-left fa-lg";
        div11.append(i1);

        const span1 = document.createElement("span");
        span1.innerText = "Back";
        span1.style.marginLeft = "15px";
        div11.append(span1);

        div1.append(div11);
        parentNode.append(div1);

        const hr1 = document.createElement("hr");
        parentNode.append(hr1);

        const div2 = document.createElement("div");
        div2.innerText = "+ New Playlist";
        div2.onclick = addPlaylist;

        const hr2 = document.createElement("hr");
        parentNode.append(div2);
        parentNode.append(hr2);

        for (let i = 0; i < myPlaylistData.data.length; i++) {
            const div3 = document.createElement("div");
            div3.innerText = myPlaylistData.data[i].name;
            div3.onclick = addCategoryToPlaylist.bind({ type: this.type, id: this.id, index: i });
            parentNode.append(div3);
        }
    }, 10);
}
