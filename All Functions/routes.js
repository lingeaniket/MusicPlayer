const handleHomeRoute = () => {
    window.history.pushState({}, "", "/");
    updateContent();
};

const handleSearchRoute = () => {
    window.history.pushState({}, "", "/search");
    updateContent();
};

async function handleHistoryRoute() {
    window.history.pushState({}, "", "/history");
    updateContent();
}
async function handleLikeRoute() {
    window.history.pushState({}, "", "/liked");
    updateContent();
}

function handleMyPlaylistRoute() {
    window.history.pushState({}, "", `/my-playlist/?id=${this.id}`);
    updateContent();
}

async function openDetails() {
    window.history.pushState({}, "", `/get-details/?type=${this.type}&id=${this.id}`);
    updateContent();
}
