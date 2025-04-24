const ball = document.getElementById('ball')
const hole = document.getElementById('hole')
const game = document.getElementById('game')
const timer = document.getElementById('timer')
const winMessage = document.getElementById('win-message')

let x = 100
let y = 100
let vx = 0
let vy = 0
let ax = 0
let ay = 0
let radius = 10
let startTime = null
let animationId = null

function updateBall() {
    vx += ax
    vy += ay

    vx *= 0.98
    vy *= 0.98

    x += vx
    y += vy

    if (x <= 0 || x + radius * 2 >= game.clientWidth) {
        x = Math.max(0, Math.min(game.clientWidth - radius * 2, x))
        vx = -vx * 0.5
    }
    if (y <= 0 || y + radius * 2 >= game.clientHeight) {
        y = Math.max(0, Math.min(game.clientHeight - radius * 2, y))
        vy = -vy * 0.5
    }

    ball.style.left = x + 'px'
    ball.style.top = y + 'px'

    const ballRect = ball.getBoundingClientRect()
    const holeRect = hole.getBoundingClientRect()
    const dx = ballRect.x + radius - (holeRect.x + 15)
    const dy = ballRect.y + radius - (holeRect.y + 15)
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 15) {
        cancelAnimationFrame(animationId)
        const time = ((performance.now() - startTime) / 1000).toFixed(2)
        winMessage.innerHTML = 'gratulacje<br>czas: ' + time + 's<br><button id="restart-btn">Zagraj ponownie</button>'
        document.getElementById('restart-btn').onclick = restartGame
        return
    }

    animationId = requestAnimationFrame(updateBall)
    updateTimer()
}

function updateTimer() {
    if (!startTime) return
    const elapsed = (performance.now() - startTime) / 1000
    timer.innerText = elapsed.toFixed(2) + 's'
}

function placeHole() {
    const padding = 40
    const maxX = game.clientWidth - 30 - padding
    const maxY = game.clientHeight - 30 - padding
    const x = Math.random() * (maxX - padding) + padding
    const y = Math.random() * (maxY - padding) + padding
    hole.style.left = x + 'px'
    hole.style.top = y + 'px'
}

function restartGame() {
    x = 100
    y = 100
    vx = 0
    vy = 0
    startTime = performance.now()
    winMessage.innerHTML = ''
    placeHole()
    animationId = requestAnimationFrame(updateBall)
}

window.addEventListener('deviceorientation', (e) => {
    const beta = e.beta ?? 90
    const gamma = e.gamma ?? 0

    ax = -gamma / 90 * 0.2
    ay = (beta - 90) / 90 * 0.2
})

placeHole()
startTime = performance.now()
animationId = requestAnimationFrame(updateBall)
