const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

const ballCount = 30;
const linkDistance = 100;
const balls = [];

let animationId;

class Ball {
    constructor() {
        this.radius = 5;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Odbicia od œcian
        if (this.x <= this.radius || this.x >= canvas.width - this.radius) this.vx *= -1;
        if (this.y <= this.radius || this.y >= canvas.height - this.radius) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();
    }
}

function drawLine(ball1, ball2) {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < linkDistance) {
        ctx.beginPath();
        ctx.moveTo(ball1.x, ball1.y);
        ctx.lineTo(ball2.x, ball2.y);
        ctx.strokeStyle = `rgba(0,229,255,${1 - distance / linkDistance})`;
        ctx.stroke();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.move());
    balls.forEach(ball => ball.draw());

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            drawLine(balls[i], balls[j]);
        }
    }

    animationId = requestAnimationFrame(animate);
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (balls.length === 0) {
        for (let i = 0; i < ballCount; i++) {
            balls.push(new Ball());
        }
    }
    if (!animationId) animate();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    animationId = null;
    balls.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
