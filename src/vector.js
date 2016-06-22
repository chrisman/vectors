function Vector(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

// add :: Vector -> Vector
Vector.prototype.add = function(v) {
  let result = new Vector(this.x, this.y);
  result.x += v.x;
  result.y += v.y;
  return result;
}

// minus :: Vector -> Vector
Vector.prototype.minus = function(v) {
  let result = new Vector(this.x, this.y);
  result.x -= v.x;
  result.y -= v.y;
  return result;
}

// mag :: Vector -> Number
Vector.prototype.mag = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

// norm :: Vector -> Vector
Vector.prototype.norm = function() {
  let result = new Vector(this.x, this.y);
  let mag = this.mag();
  if (mag > 1) {
    result.x /= mag;
    result.y /= mag;
  }
  return result;
}

export default Vector;

