document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) {
        window.location.href = 'login.html';
    } else {
        loadMusicFiles();
    }

    document.getElementById('user-details-button').addEventListener('click', function() {
        window.location.href = 'user-details.html';
    });

    function checkAuth() {
        return document.cookie.includes('loggedIn=true');
    }

    function loadMusicFiles() {
        fetch('https://api.github.com/repos/username/repository/contents/music')
            .then(response => response.json())
            .then(data => {
                const musicList = document.getElementById('music-list');
                data.forEach(file => {
                    if (file.name.endsWith('.mp3')) {
                        const songElement = document.createElement('div');
                        songElement.textContent = file.name;
                        songElement.addEventListener('click', function() {
                            playMusic(file.download_url);
                        });
                        musicList.appendChild(songElement);
                    }
                });
            });
    }

    function playMusic(url) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = url;
        audioPlayer.play();

        document.addEventListener('DOMContentLoaded', () => {
    const songList = document.querySelector('.song-list');
    const songs = [
        { title: 'Song 1', artist: 'Artist 1' },
        { title: 'Song 2', artist: 'Artist 2' },
        { title: 'Song 3', artist: 'Artist 3' }
    ];

    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.title}</span><span>${song.artist}</span>`;
        songList.appendChild(li);
    });
});


        // Initialize the Web Audio API and visualizer
        initVisualizer(audioPlayer);
    }

    function initVisualizer(audioElement) {
        const canvas = document.getElementById('visualizer');
        const ctx = canvas.getContext('2d');

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        function drawVisualizer() {
            requestAnimationFrame(drawVisualizer);
            
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i];
                const r = barHeight + 25 * (i / bufferLength);
                const g = 250 * (i / bufferLength);
                const b = 50;

                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }

        drawVisualizer();
    }
});
