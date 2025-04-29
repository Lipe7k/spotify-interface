const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const playPauseBtn = document.querySelector('#play-pause-btn');
const backMusicBtn = document.querySelector('#back-music-btn');
const forwardMusicBtn = document.querySelector('#forward-music-btn');
const nameMusic = document.querySelector("#nameMusic");
const authorMusic = document.querySelector("#authorMusic");
const imgMusic = document.querySelector("#imgMusic");

const musics = [
    {
        name: "Feel it",
        author: "D4vd",
        music: "../../musics/feel-it-d4vd.mp3",
        cover: "../../images/feel-it-img.jpg"
    },
    {
        name: "One dance",
        author: "Drake",
        music: "../../musics/onedance-drake.mp3",
        cover: "../../images/onedance-img.jpeg"
    },
    {
        name: "Love",
        author: "Keyshia Cole",
        music: "../../musics/keyshia-love.mp3",
        cover: "../../images/keyshia-love.jpeg"
    }
];

let duration = 0;
let currentTime = 0;
let isDragging = false;
let interval;
let isPlaying = false;
let audio = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateProgressBarBackground() {
    const value = progressBar.value;
    progressBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${value}%, #535353 ${value}%, #535353 100%)`;
}

function playMusic(music) {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    audio = new Audio(music.music);
    
    audio.addEventListener('loadedmetadata', function() {
        duration = audio.duration;
        durationEl.textContent = formatTime(duration);
    });

    audio.volume = Number(volumeControl.value) / 100;
    audio.play();


    nameMusic.textContent = music.name.slice(0, 20);
    authorMusic.textContent = music.author.slice(0, 30);

    if(music.name.length > 20){
        nameMusic.textContent += "..."
    }

    if(music.author.length > 30){
        authorMusic.textContent += "..."
    }

    imgMusic.src = music.cover;

    interval = setInterval(() => {
        if (audio && audio.currentTime < duration) {
            const percentage = (audio.currentTime / duration) * 100;
            progressBar.value = percentage;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            updateProgressBarBackground();
        } else if (audio.currentTime >= duration) {
            clearInterval(interval);
            isPlaying = false;
            updatePlayPauseIcon();
        }
    }, 1000);
}

function togglePlayPause() {
    if (isPlaying) {
        clearInterval(interval);
        audio.pause();
        isPlaying = false;
    } else {
        if(!audio){
            playMusic(musics[0])
        } else {
            audio.play();

        }
        isPlaying = true;

    }
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    const playIcon = '<i class="bi bi-play-circle-fill"></i>';
    const pauseIcon = '<i class="bi bi-pause-circle-fill"></i>';
    
    if (isPlaying) {
        playPauseBtn.innerHTML = pauseIcon;
    } else {
        playPauseBtn.innerHTML = playIcon;
    }
}

backMusicBtn.addEventListener("click", () => {
    currentTime -= 10;
    if (currentTime < 0) {
        currentTime = 0;
    }

    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    audio.currentTime = currentTime;
    updateProgressBarBackground();
});

forwardMusicBtn.addEventListener("click", () => {
    currentTime += 10;
    if (currentTime > duration) {
        currentTime = duration;
    }

    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    audio.currentTime = currentTime;
    updateProgressBarBackground();
});

progressBar.addEventListener('input', () => {
    isDragging = true;
    const newTime = (progressBar.value / 100) * duration;
    currentTimeEl.textContent = formatTime(newTime);
    updateProgressBarBackground();
});

progressBar.addEventListener('change', () => {
    currentTime = (progressBar.value / 100) * duration;
    audio.currentTime = currentTime;
    isDragging = false;
    updateProgressBarBackground();
});

playPauseBtn.addEventListener('click', togglePlayPause);

const volumeControl = document.querySelector("#volume");
const volumeBtn = document.querySelector("#volumeBtn");

function toggleVolume(){
    if (Number(volumeControl.value) === 0){
        volumeControl.value = 50;
    } else {
        volumeControl.value = 0;
    }

    if(audio){
        audio.volume = Number(volumeControl.value) / 100;
    }
    updateVolumeBackground();
}

volumeBtn.addEventListener("click", toggleVolume);

function updateVolumeBackground() {
    const value = Number(volumeControl.value);
    volumeControl.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${value}%, #535353 ${value}%, #535353 100%)`;
}

updateVolumeBackground();
volumeControl.addEventListener("input", () =>{
    if(audio) {
        audio.volume = volumeControl.value / 100;
    }
    updateVolumeBackground();
});

function renderMusicInfo(music) {
    const boxMusicContainer = document.querySelector(".box-music");

    const musicCard = document.createElement("div");
    musicCard.classList.add("music-card");

    const img = document.createElement("img");
    console.log(music.cover)
    img.src = music.cover;
    img.alt = music.name;
    img.classList.add("music-cover");


    const title = document.createElement("h3");
    title.textContent = music.name;
    title.classList.add("music-title");


    const author = document.createElement("p");
    author.textContent = music.author;
    author.classList.add("music-author");


  
    const imgAndTextsContainer = document.createElement("div");
    imgAndTextsContainer.classList.add("img-and-texts-container");
    imgAndTextsContainer.style.display = "flex";  
    imgAndTextsContainer.style.alignItems = "center";  
    imgAndTextsContainer.style.gap = "10px"; 

    const divTexts = document.createElement("div")

    divTexts.appendChild(title)
    divTexts.appendChild(author)

    imgAndTextsContainer.appendChild(img);
    imgAndTextsContainer.appendChild(divTexts);

    
    const time = document.createElement("span");

   
    const musicInfo = document.createElement("div");
    musicInfo.classList.add("music-info");


    const audio = new Audio(music.music);

   
    musicCard.addEventListener('click', () => {
        currentTime = 0;
        playMusic(music);
        updateSelectedMusic(musicCard);
        isPlaying = false;
        togglePlayPause()
    });

    audio.addEventListener('loadedmetadata', () => {
        time.textContent = formatTime(audio.duration);
    
        musicInfo.appendChild(imgAndTextsContainer); 
        musicInfo.appendChild(time); 
        musicCard.appendChild(musicInfo);
    
        boxMusicContainer.appendChild(musicCard);
    });
    

}



function updateSelectedMusic(musicCard) {
    const allMusicCards = document.querySelectorAll('.music-card');
    allMusicCards.forEach(card => {
        card.classList.remove('selected');
    });

    musicCard.classList.add('selected');
}

const contMusic = document.querySelector("#contMusics")
let contMusics = 0
musics.forEach(music => {
    renderMusicInfo(music) 
    contMusics+=1
});

contMusic.innerHTML = contMusics