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
    radius: 30,
    color: "pink",
    dx: 3,
    dy: 0.5
  }),
  new Ball({
    x: 50,
    y: 50,
    radius: 10,
    dx: 2,
    dy: 4,
    color: "tomato"
  })
];

function update() {
  // clear stage
  ctx.clearRect(0, 0, width, height);
  // collision check
  balls.forEach((b, i) => {
    balls.slice(0,i).concat(balls.slice(i+1)).forEach(o => {
      let dx = b.x - o.x;
      let dy = b.y - o.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < b.radius + o.radius) {
        console.log(`${b.color} go BOOM`);
      }
    });
  });
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
