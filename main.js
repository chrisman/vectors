import Ball from './ball';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 480;
var height = 320;
canvas.width = width;
canvas.height = height;
var fps = 10;

var balls = [
  new Ball(),
  new Ball({
    x: 30,
    y: 30,
    size: 30,
    color: "pink",
    dx: 3,
    dy: 0.5
  }),
  new Ball({
    x: 50,
    y: 50,
    size: 10,
    dx: 2,
    dy: 4,
    color: "tomato"
  })
];

function update() {
  ctx.clearRect(0, 0, width, height);
  balls.forEach(b => b.update());
}

function draw() {
  balls.forEach(b => b.draw(ctx));
}

function main() {
  update();
  draw();
}
setInterval(main, fps);
