const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")

const btPlay = document.querySelector(".play")
const imgPlay = document.querySelector("#img-play")
const btPause = document.querySelector(".pause")
const btStop = document.querySelector(".stop")
const imgStop = document.querySelector("#img-stop")
const btAdd = document.querySelector(".add")
const imgAdd = document.querySelector("#img-add")
const btSub = document.querySelector(".sub")
const imgSub = document.querySelector("#img-sub")

const btArvore = document.querySelector(".button-arvore")
const imgArvore = document.querySelector("#img-arvore")
const btChuva = document.querySelector(".button-chuva")
const imgChuva = document.querySelector("#img-chuva")
const btCafeteria = document.querySelector(".button-cafeteria")
const imgCafeteria = document.querySelector("#img-cafeteria")
const btLareira = document.querySelector(".button-lareira")
const imgLareira = document.querySelector("#img-lareira")

const musicArvore = new Audio("./assets/audios/floresta.wav")
const musicChuva = new Audio("./assets/audios/chuva.wav")
const musicCafeteria = new Audio("./assets/audios/cafeteria.wav")
const musicLareira = new Audio("./assets/audios/lareira.wav")

const btLight = document.querySelector(".light")
const btDark = document.querySelector(".dark")
const page = document.querySelector("#page")
const rangeArvore = document.querySelector("#volume-arvore")
const rangeChuva = document.querySelector("#volume-chuva")
const rangeCafeteria = document.querySelector("#volume-cafeteria")
const rangeLareira = document.querySelector("#volume-lareira")

btLight.addEventListener("click", () => {
  btLight.classList.add("hide")
  btDark.classList.remove("hide")
  document.body.classList.add("dark")
})
btDark.addEventListener("click", () => {
  btDark.classList.add("hide")
  btLight.classList.remove("hide")
  document.body.classList.remove("dark")
})

let minutes
let seconds
let timeOut

function controlDisabled(image, button) {
  image.classList.remove("ctrlEnabled")
  button.style.cursor = "auto"
  button.disabled = true
}

function controlEnabled(image, button) {
  image.classList.add("ctrlEnabled")
  button.style.cursor = "pointer"
  button.disabled = false
}

function updateTimer() {
  minutes = Number(minutesDisplay.textContent)
  seconds = Number(secondsDisplay.textContent)
}

function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, 0)
  secondsDisplay.textContent = String(seconds).padStart(2, 0)

  // Habilitar/Desabilitar botão "Play"
  if (minutes > 0 || seconds > 0) {
    controlEnabled(imgPlay, btPlay)
  } else {
    controlDisabled(imgPlay, btPlay)
  }

  // Desabilitar botão "Pause"
  if (minutes <= 0 && seconds <= 0) {
    btPause.classList.add("hide")
    btPlay.classList.remove("hide")
  }

  // Desabilitar botão "Stop"
  if (minutes <= 0 && seconds <= 0) {
    controlDisabled(imgStop, btStop)
  }

  // Habilitar/Desabilitar botão "Add"
  if (minutes < 20 || (minutes == 20 && seconds == 0)) {
    controlEnabled(imgAdd, btAdd)
  } else {
    controlDisabled(imgAdd, btAdd)
  }

  // Habilitar/Desabilitar botão "Sub"
  if (minutes >= 5) {
    controlEnabled(imgSub, btSub)
  } else {
    controlDisabled(imgSub, btSub)
  }
}

function buttonMusicDeselected(image, button) {
  image.classList.remove("btSelected")
  button.classList.remove("btSelected")
  button.style.cursor = "pointer"
  button.disabled = false
}

function buttonMusicSelected(image, button) {
  image.classList.add("btSelected")
  button.classList.add("btSelected")
  button.style.cursor = "auto"
  button.disabled = true
}

function countdown() {
  timeOut = setTimeout(() => {
    updateTimer()
    if (minutes <= 0 && seconds <= 0) {
      clearTimeout(timeOut)

      buttonMusicDeselected(imgArvore, btArvore)
      buttonMusicDeselected(imgChuva, btChuva)
      buttonMusicDeselected(imgCafeteria, btCafeteria)
      buttonMusicDeselected(imgLareira, btLareira)

      musicArvore.pause()
      musicChuva.pause()
      musicCafeteria.pause()
      musicLareira.pause()

      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    --seconds

    updateDisplay(minutes, seconds)
    countdown()
  }, 1000)
}

updateDisplay(0, 0)

btPlay.addEventListener("click", function () {
  btPlay.classList.add("hide")
  btPause.classList.remove("hide")

  controlEnabled(imgStop, btStop)

  countdown()
})

btPause.addEventListener("click", function () {
  btPause.classList.add("hide")
  btPlay.classList.remove("hide")

  clearTimeout(timeOut)
})

btStop.addEventListener("click", function () {
  btPause.classList.add("hide")
  btPlay.classList.remove("hide")

  clearTimeout(timeOut)
  updateDisplay(0, 0)
})

// Seleção de áudios
btArvore.addEventListener("click", function () {
  buttonMusicSelected(imgArvore, btArvore)
  buttonMusicDeselected(imgChuva, btChuva)
  buttonMusicDeselected(imgCafeteria, btCafeteria)
  buttonMusicDeselected(imgLareira, btLareira)

  musicArvore.play()
  musicChuva.pause()
  musicCafeteria.pause()
  musicLareira.pause()
  musicArvore.loop = true
  musicArvore.volume = 0.5
  rangeArvore.value = 0.5
})

rangeArvore.addEventListener("input", function () {
  const inputArvore = this.value
  musicArvore.volume = inputArvore
})

btChuva.addEventListener("click", function () {
  buttonMusicSelected(imgChuva, btChuva)
  buttonMusicDeselected(imgCafeteria, btCafeteria)
  buttonMusicDeselected(imgLareira, btLareira)
  buttonMusicDeselected(imgArvore, btArvore)

  musicChuva.play()
  musicCafeteria.pause()
  musicLareira.pause()
  musicArvore.pause()
  musicChuva.loop = true
  musicChuva.volume = 0.5
  rangeChuva.value = 0.5
})

rangeChuva.addEventListener("input", function () {
  const inputChuva = this.value
  musicChuva.volume = inputChuva
})

btCafeteria.addEventListener("click", function () {
  buttonMusicSelected(imgCafeteria, btCafeteria)
  buttonMusicDeselected(imgLareira, btLareira)
  buttonMusicDeselected(imgArvore, btArvore)
  buttonMusicDeselected(imgChuva, btChuva)

  musicCafeteria.play()
  musicLareira.pause()
  musicArvore.pause()
  musicChuva.pause()
  musicCafeteria.loop = true
  musicCafeteria.volume = 0.5
  rangeCafeteria.value = 0.5
})

rangeCafeteria.addEventListener("input", function () {
  const inputCafeteria = this.value
  musicCafeteria.volume = inputCafeteria
})

btLareira.addEventListener("click", function () {
  buttonMusicSelected(imgLareira, btLareira)
  buttonMusicDeselected(imgArvore, btArvore)
  buttonMusicDeselected(imgChuva, btChuva)
  buttonMusicDeselected(imgCafeteria, btCafeteria)

  musicLareira.play()
  musicArvore.pause()
  musicChuva.pause()
  musicCafeteria.pause()
  musicLareira.loop = true
  musicLareira.volume = 0.5
  rangeLareira.value = 0.5
})

rangeLareira.addEventListener("input", function () {
  const inputLareira = this.value
  musicLareira.volume = inputLareira
})

btAdd.addEventListener("click", function () {
  updateTimer()
  minutes = minutes + 5

  updateDisplay(minutes, seconds)
})

btSub.addEventListener("click", function () {
  updateTimer()
  minutes = minutes - 5

  updateDisplay(minutes, seconds)
})
