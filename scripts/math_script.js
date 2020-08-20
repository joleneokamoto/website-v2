var canvas;
var ctx;
var width;
var height;
var timer;
let allSheep = [];
let currentTyped = "";

const expressions = ["+", "-", "*"];
const sheepDistance = 300;
const speed = 50;

// onLoad function, initializes
function init() {
  canvas = document.getElementById('mathCanvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;

  initializeSheep();
  drawBackground();
  window.addEventListener('keypress', keyPressed)
}

// create all sheep
function initializeSheep() {
  for (let i = 0; i < 20; i++) {
    const result = randomExpression();
    var sheep = {
      expression: result[0],
      answer: result[1],
      xVal: (0 - sheepDistance * i),
      visible: false
    };
    allSheep.push(sheep)
  }
}

// creates random mathematical expression
function randomExpression() {
  const first = Math.floor(Math.random() * 10) + 1;
  const second = Math.floor(Math.random() * 10) + 1;
  const operand = expressions[Math.floor(Math.random() * 3)];
  const expression = first + " " + operand + " " + second;
  const result = eval(expression)
  return [expression, result];
}

// draws the home screen background
function drawBackground() {
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Learn Math!", width / 2, height / 2);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Click start below", width/2, height/2 + 50);
}

// draws the win screen
function drawWin() {
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("You Won!", width / 2, height / 2);
}

// draws the lose screen
function drawLose() {
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("You Lost...", width / 2, height / 2);
}

// starts the game
function start() {
  ctx.clearRect(0, 0, width, height);
  drawSheep();
  timer = setInterval(moveSheep, 1000);
}

// checks if a sheep touched "wall" then moves all sheep and runs every second
function moveSheep() {
  if (allSheep.length == 0) {
    window.clearInterval(timer);
    drawWin();
  } else if (allSheep[0].xVal >= width) {
    window.clearInterval(timer);
    drawLose();
  } else {
    allSheep.forEach((item, i) => {
      item.xVal += speed;
      if (item.xVal >= 0) {
        item.visible = true;
      }
    });
    drawSheep();
  }
}

// draws all sheep
function drawSheep() {
  ctx.clearRect(0, 0, width, height);
  ctx.font = "30px Arial";
  ctx.textAlign = "right";
  allSheep.forEach((item, index) => {
    ctx.fillText(item.expression, item.xVal, height/2);
  });
}

// changes the game state based on keyboard presses
function keyPressed(evt) {
  if (evt.which == 189 && currentTyped == "") {
    currentTyped += evt.key;
  } else if (evt.keyCode >= 48 && evt.keyCode <= 57) {
    currentTyped += evt.key;
  } else if (evt.keyCode == 13) {
    checkExpressions();
    currentTyped = "";
  }
}

// checks if the typed numbers match any visible checkExpressions
function checkExpressions() {
  const sheepCopy = [...allSheep];
  sheepCopy.forEach((item, i) => {
    if (item.visible && item.answer == currentTyped) {
      allSheep.splice(i, 1);
    }
  });
}

window.onload = init;
