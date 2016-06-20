let defaults = {
  width: 480,
  height: 320,
  x: 100,
  y: 100,
  radius: 20,
  color: "green",
  dx: 2,
  dy: 2,
  update: function(warp = 0) {
    if (warp) {
      this.x = (this.x > this.width) ? 0 : this.x + this.dx;
      this.y = (this.y > this.height) ? 0 : this.y + this.dy;
    } else if (!warp) {
      if (this.y + this.dy < this.radius || this.y + this.radius + this.dy > this.height) this.dy = -this.dy;
      if (this.x + this.dx < this.radius || this.x + this.radius + this.dx > this.width) this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
  },
  draw: function(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
    c.closePath();
  }
}

let Ball = (config = {}) => Object.assign({}, defaults, config);

export default Ball;
