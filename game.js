let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

canvas.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
};

const enemies = [
    { x: 100, y: 100, size: 20, speed: 2 },
    { x: 300, y: 100, size: 20, speed: 2 },
    { x: 200, y: 300, size: 20, speed: 2 },
];

function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) player.x += player.speed; // Swipe right
        else player.x -= player.speed; // Swipe left
    } else {
        if (dy > 0) player.y += player.speed; // Swipe down
        else player.y -= player.speed; // Swipe up
    }
}

function checkCollision() {
    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) {
            return true; // Collision detected
        }
    }
    return false;
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    for (let enemy of enemies) {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
}

function update() {
    if (checkCollision()) {
        alert('Game Over');
        window.location.reload(); // Reload the page on game over
    }
    draw();
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
