(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vector = require("./vector");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
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
};

var edgeHandler = {
  wrap: function wrap(obj) {
    if (obj.position.x > obj.width) obj.position.x = 0;
    if (obj.position.x + obj.radius < 0) obj.position.x = obj.width;;
    if (obj.position.y > obj.height) obj.position.y = 0;
    if (obj.position.y + obj.radius < 0) obj.position.y = obj.height;
  },
  bounce: function bounce(obj) {
    if (obj.position.x + obj.radius > obj.width || obj.position.x < 0) obj.velocity.x = -obj.velocity.x;
    if (obj.position.y + obj.radius > obj.height || obj.position.y < 0) obj.velocity.y = -obj.velocity.y;
  }
};

function draw(c) {
  c.beginPath();
  c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.stroke();
  c.fill();
  c.closePath();
}

function update() {
  this.position = this.position.add(this.velocity);
  edgeHandler.bounce(this);
}

var Ball = function Ball() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var result = Object.assign({}, defaults, config);

  var position = new _vector2.default(result.x, result.y);
  var velocity = new _vector2.default(result.dx, result.dy);
  result.position = position;
  result.velocity = velocity;

  return result;
};

exports.default = Ball;

},{"./vector":4}],2:[function(require,module,exports){
'use strict';

var _ball = require('./ball');

var _ball2 = _interopRequireDefault(_ball);

var _subject = require('./subject');

var _subject2 = _interopRequireDefault(_subject);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collision = new _subject2.default();
var collisionHandler = function collisionHandler(e) {
  e.velocity.x *= -1;
  e.velocity.y *= -1;
};
collision.subscribe(collisionHandler);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 480;
var height = 320;
canvas.width = width;
canvas.height = height;
var clearStage = function clearStage() {
  return ctx.clearRect(0, 0, width, height);
};
var fps = 10;
var gravity = new _vector2.default(0, 0.01);
var wind = new _vector2.default(0.005, 0);

var balls = [new _ball2.default({
  x: width / 2,
  y: height / 2
}), new _ball2.default({
  x: 30,
  y: 30,
  radius: 30,
  color: "pink"
}), new _ball2.default({
  x: 80,
  y: 30,
  radius: 10,
  color: "tomato"
})];

var forces = [gravity, wind];

function update() {
  clearStage();

  balls.forEach(function (b) {
    forces.forEach(function (f) {
      b.velocity = b.velocity.add(f);
    });

    balls.filter(function (others) {
      return others !== b;
    }).forEach(function (o) {
      var distance = b.position.minus(o.position).mag();
      if (distance <= b.radius + o.radius) collision.fire(b);
    });

    b.update();
  });
}

function draw() {
  balls.forEach(function (b) {
    return b.draw(ctx);
  });
}

function main() {
  update();
  draw();
}
setInterval(main, fps);

},{"./ball":1,"./subject":3,"./vector":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Subject = function Subject() {

  return {
    handlers: [], // observers

    subscribe: function subscribe(fn) {
      this.handlers.push(fn);
    },

    unsubscribe: function unsubscribe(fn) {
      this.handlers = this.handlers.filter(function (item) {
        return item !== fn;
      });
    },

    fire: function fire(o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    }
  };
};

exports.default = Subject;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Vector = function Vector() {
  var _ref;

  var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];


  return _ref = {
    x: x,
    y: y }, _defineProperty(_ref, "y", y), _defineProperty(_ref, "add", function add(v) {
    var result = Object.assign({}, this);
    result.x += v.x;
    result.y += v.y;
    return result;
  }), _defineProperty(_ref, "minus", function minus(v) {
    var result = Object.assign({}, this);
    result.x -= v.x;
    result.y -= v.y;
    return result;
  }), _defineProperty(_ref, "mag", function mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }), _defineProperty(_ref, "norm", function norm(v) {
    var result = Object.assign({}, this);
    var mag = this.mag();
    if (mag > 1) {
      result.x /= mag;
      result.y /= mag;
    }
    return result;
  }), _defineProperty(_ref, "limit", function limit(max) {
    // TODO
  }), _ref;
};

exports.default = Vector;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFsbC5qcyIsInNyYy9tYWluLmpzIiwic3JjL3N1YmplY3QuanMiLCJzcmMvdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7OztBQUVBLElBQUksV0FBVztBQUNiLFNBQU8sR0FETTtBQUViLFVBQVEsR0FGSztBQUdiLEtBQUcsQ0FIVTtBQUliLEtBQUcsQ0FKVTtBQUtiLFVBQVEsRUFMSztBQU1iLFNBQU8sT0FOTTtBQU9iLE1BQUksQ0FQUztBQVFiLE1BQUksQ0FSUztBQVNiLFVBQVEsTUFUSztBQVViLFFBQU07QUFWTyxDQUFmOztBQWFBLElBQUksY0FBYztBQUNoQixRQUFNLGNBQVMsR0FBVCxFQUFjO0FBQ2xCLFFBQUksSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLEtBQXpCLEVBQXFDLElBQUksUUFBSixDQUFhLENBQWIsR0FBaUIsQ0FBakI7QUFDckMsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsQ0FBbEMsRUFBcUMsSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLEtBQXJCLENBQTJCO0FBQ2hFLFFBQUksSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLE1BQXpCLEVBQXFDLElBQUksUUFBSixDQUFhLENBQWIsR0FBaUIsQ0FBakI7QUFDckMsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsQ0FBbEMsRUFBcUMsSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLE1BQXJCO0FBQ3RDLEdBTmU7QUFPaEIsVUFBUSxnQkFBUyxHQUFULEVBQWM7QUFDcEIsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsSUFBSSxLQUFsQyxJQUE0QyxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlC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TyxDQUFQLElBQVksR0FBWjtBQUNEO0FBQ0QsV0FBTyxNQUFQO0FBQ0QsR0ExQkgsa0NBMkJTLGVBQVMsR0FBVCxFQUFjOztBQUVwQixHQTdCSDtBQStCRCxDQWpDRDs7a0JBbUNlLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL3ZlY3Rvcic7XG5cbmxldCBkZWZhdWx0cyA9IHtcbiAgd2lkdGg6IDQ4MCxcbiAgaGVpZ2h0OiAzMjAsXG4gIHg6IDAsXG4gIHk6IDAsXG4gIHJhZGl1czogMjAsXG4gIGNvbG9yOiBcImdyZWVuXCIsXG4gIGR4OiAwLFxuICBkeTogMCxcbiAgdXBkYXRlOiB1cGRhdGUsXG4gIGRyYXc6IGRyYXdcbn1cblxudmFyIGVkZ2VIYW5kbGVyID0ge1xuICB3cmFwOiBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqLnBvc2l0aW9uLnggPiBvYmoud2lkdGgpICAgICAgb2JqLnBvc2l0aW9uLnggPSAwO1xuICAgIGlmIChvYmoucG9zaXRpb24ueCArIG9iai5yYWRpdXMgPCAwKSBvYmoucG9zaXRpb24ueCA9IG9iai53aWR0aDs7XG4gICAgaWYgKG9iai5wb3NpdGlvbi55ID4gb2JqLmhlaWdodCkgICAgIG9iai5wb3NpdGlvbi55ID0gMDtcbiAgICBpZiAob2JqLnBvc2l0aW9uLnkgKyBvYmoucmFkaXVzIDwgMCkgb2JqLnBvc2l0aW9uLnkgPSBvYmouaGVpZ2h0O1xuICB9LFxuICBib3VuY2U6IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmoucG9zaXRpb24ueCArIG9iai5yYWRpdXMgPiBvYmoud2lkdGggIHx8IG9iai5wb3NpdGlvbi54IDwgMCkgXG4gICAgICBvYmoudmVsb2NpdHkueCA9IC1vYmoudmVsb2NpdHkueDtcbiAgICBpZiAob2JqLnBvc2l0aW9uLnkgKyBvYmoucmFkaXVzID4gb2JqLmhlaWdodCB8fCBvYmoucG9zaXRpb24ueSA8IDApIFxuICAgICAgb2JqLnZlbG9jaXR5LnkgPSAtb2JqLnZlbG9jaXR5Lnk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhdyhjKSB7XG4gIGMuYmVnaW5QYXRoKCk7XG4gIGMuYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4gIGMuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgYy5zdHJva2UoKTtcbiAgYy5maWxsKCk7XG4gIGMuY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpO1xuICBlZGdlSGFuZGxlci5ib3VuY2UodGhpcyk7XG59XG5cbmxldCBCYWxsID0gKGNvbmZpZyA9IHt9KSA9PiB7XG4gIGxldCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgY29uZmlnKTtcblxuICBsZXQgcG9zaXRpb24gPSBuZXcgVmVjdG9yKHJlc3VsdC54LCByZXN1bHQueSk7XG4gIGxldCB2ZWxvY2l0eSA9IG5ldyBWZWN0b3IocmVzdWx0LmR4LCByZXN1bHQuZHkpO1xuICByZXN1bHQucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgcmVzdWx0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFsbDtcbiIsImltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5pbXBvcnQgU3ViamVjdCBmcm9tICcuL3N1YmplY3QnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuL3ZlY3Rvcic7XG5cbmxldCBjb2xsaXNpb24gPSBuZXcgU3ViamVjdCgpO1xubGV0IGNvbGxpc2lvbkhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gIGUudmVsb2NpdHkueCAqPSAtMTtcbiAgZS52ZWxvY2l0eS55ICo9IC0xO1xufVxuY29sbGlzaW9uLnN1YnNjcmliZShjb2xsaXNpb25IYW5kbGVyKTtcblxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNcIik7XG52YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbnZhciB3aWR0aCA9IDQ4MDtcbnZhciBoZWlnaHQgPSAzMjA7XG5jYW52YXMud2lkdGggPSB3aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG52YXIgY2xlYXJTdGFnZSA9ICgpID0+IGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG52YXIgZnBzID0gMTA7XG52YXIgZ3Jhdml0eSA9IG5ldyBWZWN0b3IoMCwgMC4wMSk7XG52YXIgd2luZCA9IG5ldyBWZWN0b3IoMC4wMDUsIDApO1xuXG52YXIgYmFsbHMgPSBbXG4gIG5ldyBCYWxsKHtcbiAgICB4OiB3aWR0aCAvIDIsXG4gICAgeTogaGVpZ2h0IC8gMlxuICB9KSwgbmV3IEJhbGwoe1xuICAgIHg6IDMwLFxuICAgIHk6IDMwLFxuICAgIHJhZGl1czogMzAsXG4gICAgY29sb3I6IFwicGlua1wiLFxuICB9KSwgbmV3IEJhbGwoe1xuICAgIHg6IDgwLFxuICAgIHk6IDMwLFxuICAgIHJhZGl1czogMTAsXG4gICAgY29sb3I6IFwidG9tYXRvXCJcbiAgfSlcbl07XG5cbnZhciBmb3JjZXMgPSBbXG4gIGdyYXZpdHksXG4gIHdpbmRcbl07XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgY2xlYXJTdGFnZSgpO1xuXG4gIGJhbGxzLmZvckVhY2goYiA9PiB7XG4gICAgZm9yY2VzLmZvckVhY2goZiA9PiB7XG4gICAgICBiLnZlbG9jaXR5ID0gYi52ZWxvY2l0eS5hZGQoZik7XG4gICAgfSk7XG4gICAgXG4gICAgYmFsbHMuZmlsdGVyKG90aGVycyA9PiBvdGhlcnMgIT09IGIpLmZvckVhY2gobyA9PiB7XG4gICAgICBsZXQgZGlzdGFuY2UgPSBiLnBvc2l0aW9uLm1pbnVzKG8ucG9zaXRpb24pLm1hZygpO1xuICAgICAgaWYgKGRpc3RhbmNlIDw9IGIucmFkaXVzICsgby5yYWRpdXMpXG4gICAgICAgIGNvbGxpc2lvbi5maXJlKGIpO1xuICAgIH0pO1xuXG4gICAgYi51cGRhdGUoKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgYmFsbHMuZm9yRWFjaChiID0+IGIuZHJhdyhjdHgpKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgdXBkYXRlKCk7XG4gIGRyYXcoKTtcbn1cbnNldEludGVydmFsKG1haW4sIGZwcyk7XG4iLCJ2YXIgU3ViamVjdCA9IGZ1bmN0aW9uKCkge1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcnM6IFtdLCAvLyBvYnNlcnZlcnNcblxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMucHVzaChmbik7XG4gICAgfSxcblxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihmbikge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZmlsdGVyKChpdGVtKSA9PiAoaXRlbSAhPT0gZm4pKSBcbiAgICB9LFxuXG4gICAgZmlyZTogZnVuY3Rpb24obywgdGhpc09iaikge1xuICAgICAgdmFyIHNjb3BlID0gdGhpc09iaiB8fCB3aW5kb3c7XG4gICAgICB0aGlzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVtLmNhbGwoc2NvcGUsIG8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YmplY3Q7XG4iLCJ2YXIgVmVjdG9yID0gZnVuY3Rpb24oeCA9IDAsIHkgPSAwKSB7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB4LFxuICAgIHksIHksXG4gICAgYWRkOiBmdW5jdGlvbih2KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XG4gICAgICByZXN1bHQueCArPSB2Lng7XG4gICAgICByZXN1bHQueSArPSB2Lnk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgbWludXM6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcbiAgICAgIHJlc3VsdC54IC09IHYueDtcbiAgICAgIHJlc3VsdC55IC09IHYueTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBtYWc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH0sXG4gICAgbm9ybTogZnVuY3Rpb24odikge1xuICAgICAgdmFyIHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xuICAgICAgdmFyIG1hZyA9IHRoaXMubWFnKCk7XG4gICAgICBpZiAobWFnID4gMSkge1xuICAgICAgICByZXN1bHQueCAvPSBtYWc7XG4gICAgICAgIHJlc3VsdC55IC89IG1hZztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBsaW1pdDogZnVuY3Rpb24obWF4KSB7XG4gICAgICAvLyBUT0RPXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiJdfQ==
