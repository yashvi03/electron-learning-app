const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants
const gridSize = 20; // Size of each grid square (pixels)
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

let snake = [{ x: 9, y: 9 }]; // Initial snake position
let direction = 'RIGHT'; // Initial snake direction
let food = { x: 5, y: 5 }; // Initial food position
let score = 0; // Score

// Main game loop
function gameLoop() {
  moveSnake();
  checkCollision();
  eatFood();
  drawGame();
}

// Move the snake
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === 'UP') head.y -= 1;
  if (direction === 'DOWN') head.y += 1;
  if (direction === 'LEFT') head.x -= 1;
  if (direction === 'RIGHT') head.x += 1;

  snake.unshift(head);
  snake.pop();
}

// Check for collisions with walls or snake's own body
function checkCollision() {
  let head = snake[0];

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
  }

  // Check if snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
    }
  }
}

// Check if snake eats food
function eatFood() {
  let head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    snake.push({}); // Grow the snake
    generateFood();
    updateScore();
  }
}

// Generate a new food position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

// Draw everything to the canvas
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = 'white';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }

  // Draw food
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2; 
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Draw score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}

// Update the score display
function updateScore() {
  document.getElementById('score').innerText = 'Score: ' + score;
}

// Game over function
function gameOver() {
  alert('Game Over! Final Score: ' + score);
  resetGame();
}

// Reset the game
function resetGame() {
  snake = [{ x: 9, y: 9 }];
  direction = 'RIGHT';
  score = 0;
  generateFood();
  updateScore();
}

// Keyboard event listener for snake movement
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  } else if (event.key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  }
});

// Start the game loop
generateFood();
setInterval(gameLoop, 200); 
