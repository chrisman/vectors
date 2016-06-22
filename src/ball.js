import Vector from './vector';

let defaults = {
  width: 480,
  height: 320,
  x: 0,
  y: 0,
  radius: 20,
  color: "green",
  dx: 0,
  dy: 0,
  update: update,
  draw: draw
}

var edgeHandler = {
  wrap: function(obj) {
    if (obj.position.x > obj.width)      obj.position.x = 0;
    if (obj.position.x + obj.radius < 0) obj.position.x = obj.width;;
    if (obj.position.y > obj.height)     obj.position.y = 0;
    if (obj.position.y + obj.radius < 0) obj.position.y = obj.height;
  },
  bounce: function(obj) {
    if (obj.position.x + obj.radius > obj.width  || obj.position.x < 0) 
      obj.velocity.x = -obj.velocity.x;
    if (obj.position.y + obj.radius > obj.height || obj.position.y < 0) 
      obj.velocity.y = -obj.velocity.y;
  }
}

function draw(c) {
  c.beginPath();
  c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
  c.fillStyle = this.color;
  c.stroke();
  c.fill();
  c.closePath();
}

function update() {
  this.position = this.position.add(this.velocity);
  edgeHandler.bounce(this);
}

let Ball = (config = {}) => {
  let result = Object.assign({}, defaults, config);

  let position = new Vector(result.x, result.y);
  let velocity = new Vector(result.dx, result.dy);
  result.position = position;
  result.velocity = velocity;

  return result;
}

export default Ball;
