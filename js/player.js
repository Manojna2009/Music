document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        { title: 'Song 1', artist: 'Artist 1', file: 'song1.mp3', thumbnail: 'thumb1.jpg' },
        { title: 'Song 2', artist: 'Artist 2', file: 'song2.mp3', thumbnail: 'thumb2.jpg' },
        { title: 'Song 3', artist: 'Artist 3', file: 'song3.mp3', thumbnail: 'thumb3.jpg' }
    ];

    const songList = document.querySelector('.song-list');
    const audio = new Audio();
    let currentSongIndex = 0;

    // Populate song list
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.dataset.index = index;
        songList.appendChild(li);
    });

    // Handle song selection
    songList.addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
            currentSongIndex = parseInt(e.target.dataset.index, 10);
            playSong(currentSongIndex);
        }
    });

    // Music player controls
    const playButton = document.getElementById('play-btn');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    playButton.addEventListener('click', togglePlay);
    nextButton.addEventListener('click', () => changeSong(1));
    prevButton.addEventListener('click', () => changeSong(-1));

    function playSong(index) {
        const song = songs[index];
        audio.src = song.file;
        audio.play();
        document.getElementById('player-song').textContent = song.title;
        document.getElementById('player-artist').textContent = song.artist;
        document.getElementById('player-thumbnail').src = song.thumbnail || 'default-thumbnail.jpg';
        playButton.textContent = '⏸'; // Update play button to pause icon
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
