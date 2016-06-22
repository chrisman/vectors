import Ball from './ball';
import Subject from './subject';
import Vector from './vector';

let collision = new Subject();
let collisionHandler = function(e) {
  // TODO make a better collision handler
  console.log(e.color, 'go BOOM');
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
var wind = new Vector(0.005, 0);

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
  gravity,
  wind
];

function update() {
  clearStage();

  balls.forEach(b => {
    environment.forEach(f => {
      b.velocity = b.velocity.add(f);
    });
    
    balls.filter(others => others !== b).forEach(o => {
      // FIXME
      let distance = b.position.minus(o.position).mag();
      if (distance.x <= b.radius) 
        console.log(b.color, 'BOOM');
      if (distance.y <= b.radius) 
        console.log(b.color, 'BLAP');
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
