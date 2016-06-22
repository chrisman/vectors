// TODO add static functions to prototype, partially apply them on return obj?
function Vector(x = 0, y = 0) {

  return {
    x: x,
    y, y,
    add: function(v) {
      var result = Object.assign({}, this);
      result.x += v.x;
      result.y += v.y;
      return result;
    },
    minus: function(v) {
      var result = Object.assign({}, this);
      result.x -= v.x;
      result.y -= v.y;
      return result;
    },
    mag: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    norm: function(v) {
      var result = Object.assign({}, this);
      var mag = this.mag();
      if (mag > 1) {
        result.x /= mag;
        result.y /= mag;
      }
      return result;
    },
    limit: function(max) {
      // TODO implement vector.limit()
    }
  }
}

export default Vector;
