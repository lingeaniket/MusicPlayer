const handleHomeRoute = () => {
    window.history.pushState({}, "", "/");
    updateContent(); // index.js
};

const handleSearchRoute = () => {
    window.history.pushState({}, "", "/search");
    updateContent(); // index.js
};

async function handleHistoryRoute() {
    window.history.pushState({}, "", "/history");
    updateContent(); // index.js
}
async function handleLikeRoute() {
    window.history.pushState({}, "", "/liked");
    updateContent(); // index.js
}

function handleMyPlaylistRoute() {
    window.history.pushState({}, "", `/my-playlist/?id=${this.id}`);
    updateContent(); // index.js
}

async function openDetails() {
    window.history.pushState({}, "", `/get-details/?type=${this.type}&id=${this.id}`);
    updateContent(); // index.js
}
