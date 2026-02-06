const tracks = Array.from(document.querySelectorAll('audio'));

let queue = [];
let currentIndex = -1;
let isShuffle = false;

/* ---------- helpers ---------- */

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function stopAll(except = null) {
    tracks.forEach(t => {
        if (t !== except) {
            t.pause();
            t.currentTime = 0;
        }
    });
}

/* ---------- queue builders ---------- */

function buildSequentialFrom(track) {
    queue = [...tracks];
    currentIndex = queue.indexOf(track);
}

function buildShuffleFrom(track) {
    const rest = tracks.filter(t => t !== track);
    shuffle(rest);
    queue = [track, ...rest];
    currentIndex = 0;
}

/* ---------- playback ---------- */

function playCurrent() {
    if (currentIndex < 0 || currentIndex >= queue.length) return;
    stopAll(queue[currentIndex]);
    queue[currentIndex].play();
}

function nextTrack() {
    if (queue.length === 0) {
        queue = [...tracks];
        currentIndex = 0;
        playCurrent();
        return;
    }

    if (currentIndex === -1) {
        return;
    }

    currentIndex++;
    if (currentIndex >= queue.length) {

        currentIndex = -1;
        return;
    }

    playCurrent();
}

/* ---------- UI actions ---------- */

function startShuffle() {
    isShuffle = true;

    queue = [...tracks];
    shuffle(queue);

    currentIndex = 0;
    playCurrent();
}

function startSequential(track) {
    isShuffle = false;
    buildSequentialFrom(track);
}

/* ---------- events ---------- */

document.getElementById('next').addEventListener('click', nextTrack);
document.getElementById('mix').addEventListener('click', startShuffle);

tracks.forEach(track => {
    track.addEventListener('play', () => {
        stopAll(track);

        if (queue.length === 0) {
            // первый запуск
            isShuffle ? buildShuffleFrom(track) : buildSequentialFrom(track);
        } else {
            // синхронизация индекса
            currentIndex = queue.indexOf(track);
        }
    });

    track.addEventListener('ended', nextTrack);
});