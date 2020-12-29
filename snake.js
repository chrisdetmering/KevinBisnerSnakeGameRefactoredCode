const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-number');
let snakeX = 400;
let snakeY = 400;
const snakeBodySize = 10;
let snakeSpeed = 10;
let snakeSpeedPositive = true;
let right = false; 
let left = false; 
let up = false; 
let down = false; 
let snakeBody = [{ x: snakeX, y: snakeY }];
let appleCount = 0;
const appleSize = 10;
let appleX = getRandomX();
let appleY = getRandomY();
let isGameOver = false;
let intervalTime = 2000;
let framesPerSecond = 10;
let refreshInterval = setInterval(playGame, intervalTime / framesPerSecond);

playGame();

function playGame() {
  if (!isGameOver) {
    drawGame();
    gameMovement();
    drawApple();
  }
}

document.addEventListener('keydown', handleKeyPress);

//1)
function handleKeyPress(e) {
  e.preventDefault(); 
  if (e.key === " " && !isGameOver) {
    return; 
  }
  right = false; 
  left = false; 
  up = false; 
  down = false; 


  if (e.key === 'ArrowUp') {
    up = true;
    snakeSpeed = -10;
    }
  
  if (e.key === 'ArrowDown') {
    down = true; 
    snakeSpeed = 10;
    }
  
  if (e.key === 'ArrowLeft') {
    left = true 
    snakeSpeed = -10;
    }
  
  if (e.key === 'ArrowRight') {
    right = true
    snakeSpeed = 10;
  }

  if (e.key == " " && isGameOver) {
    location.reload();
  }
}

function drawGame() {
  colorRectangle(0, 0, canvas.width, canvas.height, "#092b00");
}
//3)
function gameMovement() {
    moveSnake();
    drawSnake();
}

function handleSnakeTouchSelf() { 
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[0]["x"] === snakeBody[i]["x"] && snakeBody[0]["y"] === snakeBody[i]["y"]) {
      gameOver();
    }
  }
}

function handleSnakeTouchBorder() { 
  if (snakeX <= snakeBodySize || snakeY <= snakeBodySize || snakeX >= canvas.width - snakeBodySize || snakeY >= canvas.height - snakeBodySize) {
      gameOver();
    }
  }

function handleSnakeEatApple() { 
  if (snakeBody[0]["x"] === appleX && snakeBody[0]["y"] === appleY) {
      updateScore();
    }
  }

  //2)
function moveSnake() {
  if (left || right) {
      snakeX += snakeSpeed;
      snakeBody.unshift({ x: snakeX, y: snakeY });
    
  }

  if (up || down) {
      snakeY += snakeSpeed;
      snakeBody.unshift({ x: snakeX, y: snakeY});
      
  }

  snakeBody = snakeBody.slice(0, appleCount+1);
    
  handleSnakeEatApple();
  handleSnakeTouchSelf();
  handleSnakeTouchBorder();  
}



function drawSnake() {
  for (i = 0; i < snakeBody.length; i++) {
    colorCircle(snakeBody[i]["x"], snakeBody[i]["y"], snakeBodySize, "lightgreen");
  }
}

//4)
function getRandomX() {
  randomX = Math.floor(Math.random() * (890 / 10)) * 10;
  return randomX === 0 ? 10 : randomX;
}

function getRandomY() {
  randomY = Math.floor(Math.random() * (590 / 10)) * 10;
  return randomY === 0? 10 : randomY;
}

function drawApple() {
  colorCircle(appleX, appleY, appleSize, "red");
}

function newAppleXY() {
  appleX = getRandomX();
  appleY = getRandomY();

  for (let i = 0; i < snakeBody.length; i++) {
    if (appleX === snakeBody[i]["x"] && appleY === snakeBody[i]["y"]) {
      newAppleXY();
    } else {
      colorCircle(appleX, appleY, appleSize, "red");
    }
  }
}

function updateScore() {
  appleCount++;
  scoreDisplay.textContent = "0".repeat([10 - (appleCount.toString).length]) + appleCount.toString();
  speedUp();
  newAppleXY();
}

function speedUp() {
  clearInterval(refreshInterval);
  framesPerSecond += 1;
  refreshInterval = setInterval(playGame, intervalTime / framesPerSecond);
}

function gameOver() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Game over", 425, 300);
  canvasContext.fillText("Press spacebar to try again", 390, 320);
  isGameOver = true;
}

function colorRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}