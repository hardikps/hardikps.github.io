const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'माऊली-1',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%201.mp3?alt=media&token=48a1fa84-c094-444e-8053-a089ee4860a8',
    duration: '3:37',
  },
  {
    title: 'माऊली-2',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%202.mp3?alt=media&token=6e8d3e38-5d0a-40a9-8a22-138249b7185e',
    duration: '5:51',
  },
  {
    title: 'माऊली-3',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%203.mp3?alt=media&token=e4847362-0489-4502-a047-1fa4583bf02f',
    duration: '6:45',
  },
  {
    title: 'माऊली-4',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%204.mp3?alt=media&token=4327daa5-6f02-4046-9df0-6012eb9680dc',
    duration: '4:42',
  },
  {
    title: 'माऊली-5',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%206.mp3?alt=media&token=3c43d960-5582-4d5b-9ebf-94076f2459e6',
    duration: '6:31',
  },
  {
    title: 'माऊली-6',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%207.mp3?alt=media&token=3991ec44-64b0-428b-900c-eabb58bbe9f4',
    duration: '6:55',
  },
  {
    title: 'माऊली-7',
    artist: 'पेटारा टीम',
    coverPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/mauli.jpg?alt=media&token=c9a82b64-afde-41bc-8c2d-8e69be401848',
    discPath: 'https://firebasestorage.googleapis.com/v0/b/fluttervideo-5dbe1.appspot.com/o/MAULI%208.mp3?alt=media&token=6dcab283-f84f-41bb-bdc1-387b80b17947',
    duration: '8:00',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
