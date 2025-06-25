const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 200, y: 550, width: 50, height: 20, speed: 5 };
let balls = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = 'cyan';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function createBall() {
  let x = Math.random() * (canvas.width - 20) + 10;
  balls.push({ x, y: 0, radius: 10, speed: 3 + Math.random() * 2 });
}

function moveBalls() {
  for (let ball of balls) {
    ball.y += ball.speed;
  }
}

function detectCollision() {
  for (let ball of balls) {
    let dx = ball.x - (player.x + player.width / 2);
    let dy = ball.y - (player.y + player.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ball.radius + player.width / 2) {
      gameOver = true;
    }
  }
}

function updateScore() {
  score++;
  document.getElementById('score').textContent = `Score: ${score}`;
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', 120, 300);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  for (let ball of balls) drawBall(ball);

  moveBalls();
  detectCollision();
  updateScore();

  balls = balls.filter(ball => ball.y < canvas.height);

  if (Math.random() < 0.02) createBall();

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') player.x -= player.speed;
  if (e.key === 'ArrowRight') player.x += player.speed;
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
});

gameLoop();
