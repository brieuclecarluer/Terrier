const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

let player = {
    x: 50,
    y: 500,
    width: 40,
    height: 40,
    color: "#FF4444",
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    speed: 6,
    gravity: 0.6,
    jumpPower: -14,
    canFallThrough: false,
    lives: 3
};

let platforms = [
    { x: 0, y: 550, width: 600, height: 20, color: "#2ECC71" },
    { x: 700, y: 480, width: 200, height: 20, color: "#2ECC71" },
    { x: 1000, y: 420, width: 250, height: 20, color: "#2ECC71" },
    { x: 1350, y: 360, width: 200, height: 20, color: "#2ECC71" },
    { x: 1650, y: 300, width: 250, height: 20, color: "#2ECC71" },

    { x: 2000, y: 240, width: 200, height: 20, color: "#2ECC71" },
    { x: 2300, y: 180, width: 250, height: 20, color: "#2ECC71" },
    { x: 2650, y: 120, width: 200, height: 20, color: "#2ECC71" },
    
    { x: 2950, y: 200, width: 300, height: 20, color: "#2ECC71" },
    { x: 3350, y: 300, width: 200, height: 20, color: "#2ECC71" },
    { x: 3650, y: 400, width: 300, height: 20, color: "#2ECC71" },
    
    { x: 4050, y: 500, width: 400, height: 20, color: "#FFD700" },
];

let smallPlatforms = [
    { x: 250, y: 450, width: 100, height: 10, color: "#27AE60" },
    { x: 400, y: 350, width: 75, height: 10, color: "#27AE60" },
    { x: 550, y: 280, width: 80, height: 10, color: "#27AE60" },
    { x: 850, y: 380, width: 100, height: 10, color: "#27AE60" },
    { x: 1150, y: 320, width: 90, height: 10, color: "#27AE60" },
    { x: 1500, y: 260, width: 100, height: 10, color: "#27AE60" },
    { x: 1800, y: 200, width: 120, height: 10, color: "#27AE60" },
    { x: 2100, y: 140, width: 100, height: 10, color: "#27AE60" },
    { x: 2450, y: 100, width: 100, height: 10, color: "#27AE60" },
    { x: 2800, y: 60, width: 100, height: 10, color: "#27AE60" },
    { x: 3100, y: 100, width: 100, height: 10, color: "#27AE60" },
    { x: 3500, y: 200, width: 100, height: 10, color: "#27AE60" },
    { x: 3800, y: 300, width: 100, height: 10, color: "#27AE60" },
];

let spikes = [
    { x: 450, y: 530, width: 15, height: 20, color: "#E74C3C" },
    { x: 620, y: 460, width: 15, height: 20, color: "#E74C3C" },
    { x: 950, y: 400, width: 15, height: 20, color: "#E74C3C" },
    { x: 1300, y: 340, width: 15, height: 20, color: "#E74C3C" },
    { x: 1700, y: 280, width: 15, height: 20, color: "#E74C3C" },
    { x: 2050, y: 220, width: 15, height: 20, color: "#E74C3C" },
    { x: 2400, y: 160, width: 15, height: 20, color: "#E74C3C" },
    { x: 2700, y: 100, width: 15, height: 20, color: "#E74C3C" },
    { x: 3000, y: 180, width: 15, height: 20, color: "#E74C3C" },
    { x: 3400, y: 280, width: 15, height: 20, color: "#E74C3C" },
];

let walls = [
    { x: 1200, y: -100, width: 50, height: 10000, color: "#3498DB", active: true },
    { x: 2500, y: -100, width: 50, height: 10000, color: "#3498DB", active: true },
    { x: 3500, y: -100, width: 50, height: 10000, color: "#9B59B6", active: true },
];

let buttons = [
    { x: 300, y: 530, width: 30, height: 20, color: "#3498DB" },
    { x: 2100, y: 220, width: 30, height: 20, color: "#3498DB" },
    { x: 3200, y: 180, width: 30, height: 20, color: "#9B59B6" },
];

//billes
let redBalls = [
    { x: 225, y: 530, radius: 10, color: "#FF69B4", collected: false },
    { x: 275, y: 430, radius: 10, color: "#FF69B4", collected: false },
    { x: 425, y: 330, radius: 10, color: "#FF69B4", collected: false },
    { x: 575, y: 260, radius: 10, color: "#FF69B4", collected: false },
    { x: 750, y: 460, radius: 10, color: "#FF69B4", collected: false },
    
    { x: 1100, y: 400, radius: 10, color: "#FF69B4", collected: false },
    { x: 1400, y: 340, radius: 10, color: "#FF69B4", collected: false },
    { x: 1750, y: 280, radius: 10, color: "#FF69B4", collected: false },
    { x: 1850, y: 180, radius: 10, color: "#FF69B4", collected: false },
    { x: 2150, y: 220, radius: 10, color: "#FF69B4", collected: false },
    
    { x: 2350, y: 160, radius: 10, color: "#FF69B4", collected: false },
    { x: 2500, y: 80, radius: 10, color: "#FF69B4", collected: false },
    { x: 2700, y: 100, radius: 10, color: "#FF69B4", collected: false },
    { x: 2850, y: 40, radius: 10, color: "#FF69B4", collected: false },
    { x: 3000, y: 180, radius: 10, color: "#FF69B4", collected: false },
    
    { x: 3150, y: 80, radius: 10, color: "#FF69B4", collected: false },
    { x: 3550, y: 180, radius: 10, color: "#FF69B4", collected: false },
    { x: 3850, y: 280, radius: 10, color: "#FF69B4", collected: false },
    { x: 4200, y: 480, radius: 10, color: "#FF69B4", collected: false },
];

let finishLine = { x: 4300, y: 400, width: 100, height: 100 };

let ballsCollected = 0;
let gameWon = false;

function updateUI() {
    document.getElementById("ballCount").textContent = ballsCollected;
    document.getElementById("totalBalls").textContent = redBalls.length;
    document.getElementById("lives").textContent = player.lives;
}

function resetGame() {
    player.x = 50;
    player.y = 500;
    player.velocityX = 0;
    player.velocityY = 0;
    player.lives--;
    updateUI();
    
    if (player.lives <= 0) {
        alert("Game Over! Rechargez la page pour recommencer.");
        player.lives = 3;
        ballsCollected = 0;
        redBalls.forEach(ball => ball.collected = false);
        walls.forEach(wall => wall.active = true);
    }
}

function showVictory() {
    gameWon = true;
    document.getElementById("finalScore").textContent = ballsCollected + "/" + redBalls.length;
    document.getElementById("victory").style.display = "block";
}

function drawPlayer() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(player.x - camera.x + 5, player.y - camera.y + player.height, player.width - 10, 5);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
    
    ctx.fillStyle = "white";
    ctx.fillRect(player.x - camera.x + 10, player.y - camera.y + 10, 8, 8);
    ctx.fillRect(player.x - camera.x + 22, player.y - camera.y + 10, 8, 8);
    ctx.fillStyle = "black";
    ctx.fillRect(player.x - camera.x + 13, player.y - camera.y + 13, 3, 3);
    ctx.fillRect(player.x - camera.x + 25, player.y - camera.y + 13, 3, 3);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
        
        ctx.strokeStyle = "#1E8449";
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
    });
}

function drawSmallPlatforms() {
    smallPlatforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
    });
}

function drawWalls() {
    walls.forEach(wall => {
        if (wall.active) {
            ctx.fillStyle = wall.color;
            ctx.fillRect(wall.x - camera.x, wall.y - camera.y, wall.width, wall.height);
            ctx.strokeStyle = "#2C3E50";
            ctx.lineWidth = 3;
            ctx.strokeRect(wall.x - camera.x, wall.y - camera.y, wall.width, wall.height);
        }
    });
}

function drawButtons() {
    buttons.forEach(button => {
        ctx.fillStyle = button.color;
        ctx.fillRect(button.x - camera.x, button.y - camera.y, button.width, button.height);
        ctx.strokeStyle = "#2C3E50";
        ctx.lineWidth = 2;
        ctx.strokeRect(button.x - camera.x, button.y - camera.y, button.width, button.height);
    });
}

function drawRedBalls() {
    redBalls.forEach(ball => {
        if (!ball.collected) {
            ctx.beginPath();
            ctx.arc(ball.x - camera.x, ball.y - camera.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.strokeStyle = "#C0392B";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    });
}

function drawSpikes() {
    spikes.forEach(spike => {
        ctx.fillStyle = spike.color;
        ctx.beginPath();
        ctx.moveTo(spike.x - camera.x, spike.y + spike.height - camera.y);
        ctx.lineTo(spike.x + spike.width/2 - camera.x, spike.y - camera.y);
        ctx.lineTo(spike.x + spike.width - camera.x, spike.y + spike.height - camera.y);
        ctx.closePath();
        ctx.fill();
    });
}

function drawFinishLine() {
    ctx.fillStyle = "black";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillRect(
                    finishLine.x - camera.x + (i * 20),
                    finishLine.y - camera.y + (j * 20),
                    20, 20
                );
            }
        }
    }
    
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(finishLine.x - camera.x - 10, finishLine.y - camera.y, 10, 120);
}

function updateGame() {
    if (gameWon) return;
    
    let prevY = player.y;

    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // collisions
    platforms.forEach(platform => {
        if (prevY + player.height <= platform.y && 
            player.y + player.height >= platform.y &&
            player.x + player.width > platform.x && 
            player.x < platform.x + platform.width && 
            !player.canFallThrough) {
            player.isJumping = false;
            player.y = platform.y - player.height;
            player.velocityY = 0;
        }
    });

    smallPlatforms.forEach(platform => {
        if (prevY + player.height <= platform.y && 
            player.y + player.height >= platform.y &&
            player.x + player.width > platform.x && 
            player.x < platform.x + platform.width && 
            !player.canFallThrough) {
            player.isJumping = false;
            player.y = platform.y - player.height;
            player.velocityY = 0;
        }
    });

    walls.forEach(wall => {
        if (wall.active && 
            player.x + player.width > wall.x && 
            player.x < wall.x + wall.width &&
            player.y + player.height > wall.y && 
            player.y < wall.y + wall.height) {
            if (player.velocityX > 0) {
                player.x = wall.x - player.width;
            } else if (player.velocityX < 0) {
                player.x = wall.x + wall.width;
            }
            player.velocityX = 0;
        }
    });

    player.x += player.velocityX;

    // collecte des billes
    redBalls.forEach(ball => {
        if (!ball.collected && 
            player.x < ball.x + ball.radius && 
            player.x + player.width > ball.x - ball.radius &&
            player.y < ball.y + ball.radius && 
            player.y + player.height > ball.y - ball.radius) {
            ball.collected = true;
            ballsCollected++;
            updateUI();
        }
    });

    //mort avec pics
    spikes.forEach(spike => {
        if (player.x + player.width > spike.x && 
            player.x < spike.x + spike.width &&
            player.y + player.height > spike.y && 
            player.y < spike.y + spike.height) {
            resetGame();
        }
    });

    buttons.forEach((button, index) => {
        if (player.x + player.width > button.x && 
            player.x < button.x + button.width &&
            player.y + player.height > button.y && 
            player.y < button.y + button.height) {
            if (walls[index] && walls[index].active) {
                walls[index].active = false;
            }
        }
    });

    // ligne d'arrivée
    if (player.x + player.width > finishLine.x && 
        player.x < finishLine.x + finishLine.width &&
        player.y + player.height > finishLine.y && 
        player.y < finishLine.y + finishLine.height) {
        showVictory();
    }

    // mort
    if (player.y > 800) {
        resetGame();
    }

    //la maj de la caméra
    camera.x = player.x - canvas.width / 2 + player.width / 2;
    camera.y = player.y - canvas.height / 2 + player.height / 2;

    camera.x = Math.max(0, Math.min(camera.x, 4500 - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, 800 - canvas.height));
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlatforms();
    drawSmallPlatforms();
    drawWalls();
    drawButtons();
    drawRedBalls();
    drawSpikes();
    drawFinishLine();
    drawPlayer();

    updateGame();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
        player.velocityX = player.speed;
    } else if (event.code === "ArrowLeft") {
        player.velocityX = -player.speed;
    } else if (event.code === "ArrowUp" && !player.isJumping) {
        player.isJumping = true;
        player.velocityY = player.jumpPower;
    } else if (event.code === "ArrowDown") {
        player.canFallThrough = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        player.velocityX = 0;
    } else if (event.code === "ArrowDown") {
        player.canFallThrough = false;
    }
});

updateUI();
gameLoop();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.width = canvas.width;
    camera.height = canvas.height;
});
