//CONSTANTS DECLARATION
const canvas = document.getElementById('snake'); 
const ctx = canvas.getContext('2d');
const SnakeParts = [];

//VARIABLE DECLARATION
let speed = 5;
let tileCount = 20;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = getRandomInt();
let appleY = getRandomInt();
let tailLength = 2;
let score = 0;
let randomColor = randomcol();

//CLASS SNAKE 
class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

//MAIN FUNCTION
function drawGame() {

	changeSnake();

	let result = gameOver();
	if (result) {
		return;
	}

	clearScreen();
	checkApple();
	drawApple();
	drawSnake();
	drawScore();

  if(score>10){
    speed = 10;
  }

  if(score > 30){
    speed = 15;
  }

  if(score > 50){
    speed = 20;
  }
	setTimeout(drawGame, 1000 / speed);
}

//FUNCTION TO CHECK IF GAME OVER OR NOT
function gameOver() {
	let gameOver = false;

	if (yVelocity === 0 && xVelocity === 0) {
		return false;
	}

//WALLS
	if (headX < 0) {
		gameOver = true;
	} else if (headX === tileCount) {
		gameOver = true
	} else if (headY < 0) {
		gameOver = true;
	} else if (headY === tileCount) {
		gameOver = true
	}

//SNAKE TOUCHING ITS BODY CHECK 
	for (let i = 0; i < SnakeParts.length; i++) {
		let part = SnakeParts[i];
		if (part.x === headX && part.y === headY) {
			gameOver = true;
			break;
		}
	}

//WHAT TO DO WHEN GAME OVER
		if (gameOver) {
			ctx.fillStyle = "white";
			ctx.font = "50px Verdana";
			ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
		}

	return gameOver;
}


function clearScreen() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//ADDS VELOCITY 
function changeSnake() {
	headX += xVelocity;
	headY += yVelocity;
}

//APPLE EATEN BY SNAKE 
function checkApple() {

	if (appleX === headX && appleY === headY) {
		appleX = getRandomInt();
		appleY = getRandomInt();
		drawApple();
		tailLength++;
    score++;
	}
}

//DRAWS APPLE 
function drawApple() {
	ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileCount, tileCount);
}

//DRAWS SNAKE 
function drawSnake() {

	ctx.fillStyle = randomColor;
	ctx.fillRect(headX * tileCount, headY * tileCount, tileCount, tileCount);

	ctx.fillStyle = randomColor;
	for (let i = 0; i < SnakeParts.length; i++) {
		let part = SnakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileCount, tileCount);
	}
	SnakeParts.push(new SnakePart(headX, headY));

	if (SnakeParts.length > tailLength) {
		SnakeParts.shift();
	}
}

//TO CHECK WHICH BUTTON IS PRESSED AND WHAT TO DO 
function keyDown(event) {
	
  //UP
	if (event.keyCode == 38 || event.keyCode == 87) {

		if (yVelocity == 1) {
			return;
		}
		yVelocity = -1;
		xVelocity = 0;
	}

	//DOWN 
	if (event.keyCode == 40 || event.keyCode == 83) {

		if (yVelocity == -1) {
			return;
		}
		yVelocity = 1;
		xVelocity = 0;
	}

	//RIGHT
	if (event.keyCode == 39 || event.keyCode == 68) {

		if (xVelocity == -1) {
			return;
		}
		yVelocity = 0;
		xVelocity = 1;
	}

	//LEFT
	if (event.keyCode == 37 || event.keyCode == 65) {

		if (xVelocity == 1) {
			return;
		}
		yVelocity = 0;
		xVelocity = -1;
	}
}

//SHOWS SCORE 
function drawScore() {
	ctx.fillStyle = "white";
	ctx.font = "10px Verdana";
	ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

//RANDOM FUNCTION FOR DRAWING APPLE 
function getRandomInt() {
	return Math.floor(Math.random() * Math.floor(20)) + 1;
}

//RANDOM FUNCTION FOR SNAKE COLOR 
function randomcol() {
	let e = "#" + Math.floor(Math.random() * 16777215).toString(16);
	if (e === "#000000" || e === "#FF0000") {
		randomcol();
	} else {
		return e;
	}

}

//EVENT LISTENER 
document.addEventListener('keydown', keyDown);

//MAIN FUNCTION CALL 
drawGame();