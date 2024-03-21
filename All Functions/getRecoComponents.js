async function loadRecommendations(type, modules) {
    const maindiv = document.getElementById("details-01-div");
    const detailRec01 = document.getElementById("details-rec-01");
    const detailRec02 = document.getElementById("details-rec-02");

    if (type === "song") {
        for (let i = 0; i < 1; i++) {
            // make condition i< 2 if top songs api working
            const div01 = document.createElement("div");
            const h31 = document.createElement("h3");
            let data = [];
            if (i === 0) {
                h31.innerText = "You May Like";
                const { id, lang } = modules.recommend.params;
                const songData = await axios.get(`https://jio-saavn-api.onrender.com/song/recommend?id=${id}&language=${lang}}`);
                // /song/recommend?id=${id}&language=${lang}
                // const songData = await axios.get(
                //     `https://music-streaming-api.onrender.com/api/v1/music/get-song-yml?songId=${player.id}&language=${player.language}&year=${player.year}&albumId=${player.album.id}`
                // );
                data = songData.data.data;
            } else {
                h31.innerText = "Top songs of same artist";
                const songData = await axios.get(
                    `https://music-streaming-api.onrender.com/api/v1/music/get-tsosar?songId=${player.id}&language=${player.language}&artistId=${player.primaryArtistsId}`
                );
                data = songData.data;
            }
            if (data.length > 0) {
                div01.append(h31);

                const div02 = document.createElement("div");
                const cat01 = document.createElement("div");
                cat01.className = "cat-01";
                if (i === 0) {
                    createListItems(data, cat01, "song-yml"); // home.js 35
                } else {
                    createListItems(data, cat01, ""); // home.js 35
                }
                div02.append(cat01);

                if (i === 0) {
                    detailRec01.append(div01);
                    detailRec01.append(div02);
                    maindiv.append(detailRec01);
                } else {
                    detailRec02.append(div01);
                    detailRec02.append(div02);
                    maindiv.append(detailRec02);
                }
            }
        }
    } else if (type === "album") {
        for (let i = 0; i < 2; i++) {
            const h31 = document.createElement("h3");
            const div01 = document.createElement("div");

            let data = [];
            if (i === 0) {
                h31.innerText = "You May Like";
                const { id } = modules.recommend.params;
                const songData = await axios.get(`https://jio-saavn-api.onrender.com/album/recommend?id=${id}`);
                data = songData.data.data;
            } else {
                h31.innerText = "Top albums of same year";
                const { year, language } = modules.top_albums_from_same_year.params;
                const songData = await axios.get(`https://jio-saavn-api.onrender.com/album/same-year?year=${year}&language=${language}`);
                data = songData.data.data;
            }
            if (data.length > 0) {
                div01.append(h31);

                const div02 = document.createElement("div");
                const cat01 = document.createElement("div");
                cat01.className = "cat-01";
                createListItems(data, cat01, "");
                div02.append(cat01);

                if (i === 0) {
                    detailRec01.append(div01);
                    detailRec01.append(div02);
                    maindiv.append(detailRec01);
                } else {
                    detailRec02.append(div01);
                    detailRec02.append(div02);
                    maindiv.append(detailRec02);
                }
            }
        }
    } else if (type === "playlist") {
        const h31 = document.createElement("h3");
        const div01 = document.createElement("div");

        h31.innerText = "Related Playlists";
        const songData = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/get-rp?playlistId=${player.id}`);
        const data = songData.data;

        div01.append(h31);

        const div02 = document.createElement("div");

        const cat01 = document.createElement("div");
        cat01.className = "cat-01";

        createListItems(data, cat01, "");

        div02.append(cat01);

        detailRec01.append(div01);
        detailRec01.append(div02);
        maindiv.append(detailRec01);
    } else if (type === "artist") {
        const h31 = document.createElement("h3");
        const div01 = document.createElement("div");

        h31.innerText = "Top Albums";
        const songData = await axios.get(`https://saavn.dev/artists/${player.id}/albums?page=1`);
        const data = songData.data.data.results;

        div01.append(h31);

        const div02 = document.createElement("div");
        const cat01 = document.createElement("div");
        cat01.className = "cat-01";
        createListItems(data, cat01, "");
        div02.append(cat01);

        detailRec01.append(div01);
        detailRec01.append(div02);
        maindiv.append(detailRec01);
    }
}
