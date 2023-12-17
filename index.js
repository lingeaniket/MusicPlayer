import axios from "axios";

const mainDiv = document.getElementById("mainDiv");

const loadSongs = async ()=>{
    const song = await axios.get('/')
}

const loadData = () => {
    
};

// loadData();

window.onload = () => {
    // alert("added");
    loadData();
};

