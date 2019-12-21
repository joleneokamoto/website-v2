var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var width;
var height;

function setCanvasSize() {
  context.canvas.width = window.innerWidth;
  width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

var colors = ['rgb(63, 97, 132, 1)', 'rgb(252, 220, 10, 0.3)', 'rgb(119, 136, 153, 0.2)'];
var circles = [];
var speed = 3;

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

colors.forEach(drawAllCircles);

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

setInterval(moveShapes, 50);