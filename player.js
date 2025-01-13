document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    const audio = new Audio();
    let currentSongIndex = 0;
    let songs = [];

    // Load songs dynamically from songs.json
    fetch('songs/songs.json')
        .then(response => response.json())
        .then(data => {
            songs = data;
            populateSongList();
        })
        .catch(err => console.error('Error loading songs:', err));

    // Populate the song list
    function populateSongList() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.dataset.index = index;
            songList.appendChild(li);
        });
    }

    // Play song on click
    songList.addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
            currentSongIndex = parseInt(e.target.dataset.index, 10);
            playSong(currentSongIndex);
        }
    });

    // Control buttons
    const playButton = document.getElementById('play-btn');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    playButton.addEventListener('click', togglePlay);
    nextButton.addEventListener('click', () => changeSong(1));
    prevButton.addEventListener('click', () => changeSong(-1));

    function playSong(index) {
        const song = songs[index];
        audio.src = `songs/${song.file}`;
        audio.play();
        document.getElementById('player-song').textContent = song.title;
        document.getElementById('player-artist').textContent = song.artist;
        document.getElementById('player-thumbnail').src = song.thumbnail || 'default-thumbnail.jpg';
        playButton.textContent = '⏸';
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = '⏸';
        } else {
            audio.pause();
            playButton.textContent = '⏯';
        }
    }

    function changeSong(direction) {
        currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
        playSong(currentSongIndex);
    }
});
