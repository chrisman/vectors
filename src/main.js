import Ball from './ball';
import Subject from './subject';
import Vector from './vector';

let collision = new Subject();
let collisionHandler = function(e) {
  // TODO make a better collision handler
  e.dy *= -1;
  e.dx *= -1;
}
collision.subscribe(collisionHandler);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 480;
var height = 320;
canvas.width = width;
canvas.height = height;
var clearStage = () => ctx.clearRect(0, 0, width, height);
var fps = 10;
var gravity = new Vector(0, 0.01);

var balls = [
  new Ball({
    x: width / 2,
    y: height / 2
  }), new Ball({
    x: 30,
    y: 30,
    radius: 30,
    color: "pink",
  }), new Ball({
    x: 80,
    y: 30,
    radius: 10,
    color: "tomato"
  })
];

var environment = [
  gravity
];

function update() {
  // clear stage
  clearStage();

  balls.forEach(b => {
    environment.forEach(f => {
      b.velocity = b.velocity.add(f);
    });

    b.update()
  });
}

function draw() {
  balls.forEach(b => b.draw(ctx));
}

function main() {
  update();
  draw();
}
setInterval(main, fps);
