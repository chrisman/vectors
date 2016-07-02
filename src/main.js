// TODO implement mass
// TODO implement accelreation
import Ball from './ball';
import Subject from './subject';
import Vector from './vector';
import ballData from './ball-data';

let balls = ballData.map(b => new Ball(b));

// collision subject / observer
let collision = new Subject();
let collisionHandler = function(e) {
  const inverse = {x: -1, y: -1};
  e.velocity = e.velocity.times(inverse);
}
collision.subscribe(collisionHandler);

// canvas setup
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = 480;
let height = 320;
canvas.width = width;
canvas.height = height;
let fps = 10;
let clearStage = () => ctx.clearRect(0, 0, width, height);

// environment
let gravity = new Vector(0, 0.01);
let wind = new Vector(0.005, 0);
let forces = [
  gravity,
  wind
];

function update() {
  clearStage();

  balls.forEach(ball => {
    const notThisBall = (b) => b !== ball;

    balls.filter(notThisBall).forEach(other => {
      let distance       = ball.position.minus(other.position).mag();
      let spaceAvailable = ball.radius + other.radius;
      if (distance <= spaceAvailable)
        collision.fire(ball);
    });

    forces.forEach(force => {
      ball.applyForce(force);
    });
    ball.update()
  });
}

function draw() {
  balls.forEach(b => b.draw(ctx));
}

// game loop
function main() {
  update();
  draw();
}
setInterval(main, fps);
