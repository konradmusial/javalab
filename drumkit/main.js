const clapSound = new Audio("c:/Users/user/Source/Repos/javalab/drumkit/clap.wav")
const hihatSound = new Audio("c:/Users/user/Source/Repos/javalab/drumkit/hihat.wav")
const kickSound = new Audio("c:/Users/user/Source/Repos/javalab/drumkit/kick.wav")

const sounds = {
  a: clapSound,
  s: hihatSound,
  d: kickSound
}

const keyMap = {
  clapBtn: "a",
  hihatBtn: "s",
  kickBtn: "d"
}

Object.entries(keyMap).forEach(([btnId, key]) => {
  document.getElementById(btnId).addEventListener("click", () => {
    playSound(key)
    recordHit(key)
  })
})

document.addEventListener("keypress", (e) => {
  if (["a", "s", "d"].includes(e.key)) {
    playSound(e.key)
    recordHit(e.key)
  }
})

let tracks = []
let recordings = {}
let timers = {}

function playSound(key) {
  const sound = new Audio(sounds[key].src)
  sound.currentTime = 0
  sound.play()
}

function recordHit(key) {
  Object.values(recordings).forEach(obj => {
    const time = Date.now() - obj.start
    obj.track.push({ key, time })
  })
}

function createTrack() {
  const track = []
  const trackId = `track${tracks.length}`
  const trackBox = document.createElement("div")
  trackBox.className = "track"

  const startBtn = document.createElement("button")
  startBtn.textContent = "Start Recording"

  const stopBtn = document.createElement("button")
  stopBtn.textContent = "Stop Recording"
  stopBtn.disabled = true

  const playBtn = document.createElement("button")
  playBtn.textContent = "Play"

  const timer = document.createElement("div")
  timer.className = "timer"
  timer.textContent = "0s"

  let interval

  startBtn.addEventListener("click", () => {
    recordings[trackId] = {
      start: Date.now(),
      track
    }
    track.length = 0
    startBtn.disabled = true
    stopBtn.disabled = false
    timer.textContent = "0s"
    interval = setInterval(() => {
      const sec = Math.floor((Date.now() - recordings[trackId].start) / 1000)
      timer.textContent = `${sec}s`
    }, 1000)
  })

  stopBtn.addEventListener("click", () => {
    delete recordings[trackId]
    startBtn.disabled = false
    stopBtn.disabled = true
    clearInterval(interval)
  })

  playBtn.addEventListener("click", () => {
    track.forEach(hit => {
      setTimeout(() => {
        playSound(hit.key)
      }, hit.time)
    })
  })

  trackBox.appendChild(startBtn)
  trackBox.appendChild(stopBtn)
  trackBox.appendChild(playBtn)
  trackBox.appendChild(timer)
  document.getElementById("tracks").appendChild(trackBox)

  tracks.push(track)
}

document.getElementById("addTrackBtn").addEventListener("click", createTrack)

document.getElementById("playAllBtn").addEventListener("click", () => {
  tracks.forEach(track => {
    track.forEach(hit => {
      setTimeout(() => {
        playSound(hit.key)
      }, hit.time)
    })
  })
})
