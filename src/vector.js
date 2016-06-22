function Vector(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(v) {
  var result = new Vector(this.x, this.y);
  result.x += v.x;
  result.y += v.y;
  return result;
}

Vector.prototype.minus = function(v) {
  var result = new Vector(this.x, this.y);
  result.x -= v.x;
  result.y -= v.y;
  return result;
}

Vector.prototype.mag = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.norm = function() {
  var result = new Vector(this.x, this.y);
  var mag = this.mag();
  if (mag > 1) {
    result.x /= mag;
    result.y /= mag;
  }
  return result;
}

export default Vector;

