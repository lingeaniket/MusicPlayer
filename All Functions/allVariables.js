let player = "";
let searchkey = "";
let totalSongs = "";
let playerSongs = "";

let currentPage = 0;
let currentviewPage = 1;
let currentQueuePage = 0;
let totalArtistSongs = 0;

let songList = null;
let timerData = null;
let searchTimer = null;
let currentArtistId = null;
let searchResultsDiv = null;

let lastpage = true;
let isArtist = false;
let isSearching = false;

let queueData = [];
let currentViewSongs = [];
let currentViewAlbums = [];
let currentViewArtists = [];
let currentViewPlaylists = [];
const avilableLanguages = [
    "Hindi",
    "English",
    "Punjabi",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Bengali",
    "Kannada",
    "Bhojpuri",
    "Malayalam",
    "Urdu",
    "Haryanvi",
    "Rajasthani",
    "Odia",
    "Assamese",
];

const musicPlayerData = {
    currentSong: 0,
    songIndex: 0,
    currentSongDetails: {},
    songQueue: [],
};

const likedData = localStorage.getItem("liked-data")
    ? JSON.parse(localStorage.getItem("liked-data"))
    : { song: [], playlist: [], artist: [], album: [] };

const recentData = localStorage.getItem("recent-data")
    ? JSON.parse(localStorage.getItem("recent-data"))
    : { song: [], playlist: [], artist: [], album: [] };

const myPlaylistData = localStorage.getItem("my-playlist-data")
    ? JSON.parse(localStorage.getItem("my-playlist-data"))
    : { lastId: 0, data: [] };

let localLanguages = localStorage.getItem("local-languages") ? JSON.parse(localStorage.getItem("local-languages")) : ["hindi", "english"];

const mainDiv = document.getElementById("mainDiv");
const slider1 = document.getElementById("song-range1");
const slider2 = document.getElementById("song-range2");
const playlist = document.getElementById("your-playlists");
const selector1 = document.getElementById("selector1");
const selector2 = document.getElementById("selector2");
const queueSide = document.getElementById("queue-side");
const queueStack = document.getElementById("queue-stack");
const musicPlayer = document.getElementById("music-player-main");
const playPauseBtn = document.getElementById("playPause");
const progressBar1 = document.getElementById("progressBar1");
const progressBar2 = document.getElementById("progressBar2");
const queueCurrent = document.getElementById("queue-current-song");
const songDuration = document.getElementById("song-duration");
const queuePlaylist = document.getElementById("queue-playlist");
const mainContainer = document.getElementById("main-container");
const mainMusicPlayer = document.getElementById("music-player-div");
const songCurrentTime = document.getElementById("song-current-time");
