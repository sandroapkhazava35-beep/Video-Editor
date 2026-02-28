const videoPlayer = document.getElementById('video-player');
const videoUpload = document.getElementById('video-upload');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeDisplay = document.getElementById('volume-display');
const speedDisplay = document.getElementById('speed-display');

let currentSpeed = 1;

// Handle video upload
videoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        videoPlayer.src = url;
        videoPlayer.load();
    }
});

// Update time display
videoPlayer.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(videoPlayer.currentTime);
    durationDisplay.textContent = formatTime(videoPlayer.duration);
});

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play video
function playVideo() {
    videoPlayer.play();
}

// Pause video
function pauseVideo() {
    videoPlayer.pause();
}

// Stop video
function stopVideo() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
}

// Increase volume
function increaseVolume() {
    if (videoPlayer.volume < 1) {
        videoPlayer.volume += 0.1;
        videoPlayer.volume = Math.min(videoPlayer.volume, 1);
        updateVolumeDisplay();
    }
}

// Decrease volume
function decreaseVolume() {
    if (videoPlayer.volume > 0) {
        videoPlayer.volume -= 0.1;
        videoPlayer.volume = Math.max(videoPlayer.volume, 0);
        updateVolumeDisplay();
    }
}

// Mute video
function muteVideo() {
    videoPlayer.muted = !videoPlayer.muted;
    updateVolumeDisplay();
}

// Update volume display
function updateVolumeDisplay() {
    if (videoPlayer.muted) {
        volumeDisplay.textContent = 'Muted';
    } else {
        volumeDisplay.textContent = Math.round(videoPlayer.volume * 100) + '%';
    }
}

// Change playback speed
function changePlaybackSpeed() {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(currentSpeed);
    currentSpeed = speeds[(currentIndex + 1) % speeds.length];
    videoPlayer.playbackRate = currentSpeed;
    speedDisplay.textContent = currentSpeed + 'x';
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            alert(`Error: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Download video
function downloadVideo() {
    if (videoPlayer.src) {
        const a = document.createElement('a');
        a.href = videoPlayer.src;
        a.download = 'video-edited.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Please upload a video first!');
    }
}

// Initialize
updateVolumeDisplay();
speedDisplay.textContent = '1x';