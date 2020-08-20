var canvas
var context
var width;
var height;
var colors = ['rgb(23, 63, 95, 0.5)', 'rgb(246, 213, 92, 0.5)', 'rgb(119, 136, 153, 0.5'];
var circles = [];
var speed = 3;

function init() {
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  colors.forEach(drawAllCircles);
  setInterval(moveShapes, 50);
}

function setCanvasSize() {
  context.canvas.width = window.innerWidth;
  width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  height = window.innerHeight;
}

// create all initial circles
function drawAllCircles(value) {
  for (var i = 0; i < 15; i++) {
    var w = randomNum(width);
    var h = randomNum(height);
    var dir = randomNum(360);
    circles.push({x:w,
                  y:h,
                  color:value,
                  direction:dir});
    drawCircle(w, h, value);
  }
}

// draws individual circle
function drawCircle(x, y, color) {
  context.beginPath();
  // x, y, radius
  context.arc(x, y, 20, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

// create a random number
function randomNum(floor) {
  return Math.random() * Math.floor(floor);
}

// moves shapes based on x, y, and direction
function moveShapes() {
  context.clearRect(0, 0, width, height);
  for (var i = 0; i < circles.length; i++) {
    var curr = circles[i];
    var dir = curr.direction;
    curr.x = (curr.x + moveX(dir)) % width;
    curr.y = (curr.y + moveY(dir)) % height;
    if (curr.y <= 0) {
      curr.y = height;
    }
    if (curr.x <= 0) {
      curr.x = width;
    }
    drawCircle(curr.x, curr.y, curr.color);
  }
}

function moveX(degree) {
  return speed * Math.cos(degree * Math.PI / 180);
}

function moveY(degree) {
  return speed * Math.sin(degree * Math.PI / 180);
}

window.onload = init;
