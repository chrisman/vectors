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
  // TODO make a better collision handler
  console.log(e.color, 'go BOOM');
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

var environment = [gravity, wind];

function update() {
  clearStage();

  balls.forEach(function (b) {
    environment.forEach(function (f) {
      b.velocity = b.velocity.add(f);
    });

    balls.filter(function (others) {
      return others !== b;
    }).forEach(function (o) {
      // FIXME
      var distance = b.position.minus(o.position).mag();
      if (distance.x <= b.radius) console.log(b.color, 'BOOM');
      if (distance.y <= b.radius) console.log(b.color, 'BLAP');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFsbC5qcyIsInNyYy9tYWluLmpzIiwic3JjL3N1YmplY3QuanMiLCJzcmMvdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7OztBQUVBLElBQUksV0FBVztBQUNiLFNBQU8sR0FETTtBQUViLFVBQVEsR0FGSztBQUdiLEtBQUcsQ0FIVTtBQUliLEtBQUcsQ0FKVTtBQUtiLFVBQVEsRUFMSztBQU1iLFNBQU8sT0FOTTtBQU9iLE1BQUksQ0FQUztBQVFiLE1BQUksQ0FSUztBQVNiLFVBQVEsTUFUSztBQVViLFFBQU07QUFWTyxDQUFmOztBQWFBLElBQUksY0FBYztBQUNoQixRQUFNLGNBQVMsR0FBVCxFQUFjO0FBQ2xCLFFBQUksSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLEtBQXpCLEVBQXFDLElBQUksUUFBSixDQUFhLENBQWIsR0FBaUIsQ0FBakI7QUFDckMsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsQ0FBbEMsRUFBcUMsSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLEtBQXJCLENBQTJCO0FBQ2hFLFFBQUksSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLE1BQXpCLEVBQXFDLElBQUksUUFBSixDQUFhLENBQWIsR0FBaUIsQ0FBakI7QUFDckMsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsQ0FBbEMsRUFBcUMsSUFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixJQUFJLE1BQXJCO0FBQ3RDLEdBTmU7QUFPaEIsVUFBUSxnQkFBUyxHQUFULEVBQWM7QUFDcEIsUUFBSSxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlCLElBQUksTUFBckIsR0FBOEIsSUFBSSxLQUFsQyxJQUE0QyxJQUFJLFFBQUosQ0FBYSxDQUFiLEdBQWlC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QUFDQSxRQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1gsYUFBTyxDQUFQLElBQVksR0FBWjtBQUNBLGFBQU8sQ0FBUCxJQUFZLEdBQVo7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBMUJILGtDQTJCUyxlQUFTLEdBQVQsRUFBYzs7QUFFcEIsR0E3Qkg7QUErQkQsQ0FqQ0Q7O2tCQW1DZSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xuXG5sZXQgZGVmYXVsdHMgPSB7XG4gIHdpZHRoOiA0ODAsXG4gIGhlaWdodDogMzIwLFxuICB4OiAwLFxuICB5OiAwLFxuICByYWRpdXM6IDIwLFxuICBjb2xvcjogXCJncmVlblwiLFxuICBkeDogMCxcbiAgZHk6IDAsXG4gIHVwZGF0ZTogdXBkYXRlLFxuICBkcmF3OiBkcmF3XG59XG5cbnZhciBlZGdlSGFuZGxlciA9IHtcbiAgd3JhcDogZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iai5wb3NpdGlvbi54ID4gb2JqLndpZHRoKSAgICAgIG9iai5wb3NpdGlvbi54ID0gMDtcbiAgICBpZiAob2JqLnBvc2l0aW9uLnggKyBvYmoucmFkaXVzIDwgMCkgb2JqLnBvc2l0aW9uLnggPSBvYmoud2lkdGg7O1xuICAgIGlmIChvYmoucG9zaXRpb24ueSA+IG9iai5oZWlnaHQpICAgICBvYmoucG9zaXRpb24ueSA9IDA7XG4gICAgaWYgKG9iai5wb3NpdGlvbi55ICsgb2JqLnJhZGl1cyA8IDApIG9iai5wb3NpdGlvbi55ID0gb2JqLmhlaWdodDtcbiAgfSxcbiAgYm91bmNlOiBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqLnBvc2l0aW9uLnggKyBvYmoucmFkaXVzID4gb2JqLndpZHRoICB8fCBvYmoucG9zaXRpb24ueCA8IDApIFxuICAgICAgb2JqLnZlbG9jaXR5LnggPSAtb2JqLnZlbG9jaXR5Lng7XG4gICAgaWYgKG9iai5wb3NpdGlvbi55ICsgb2JqLnJhZGl1cyA+IG9iai5oZWlnaHQgfHwgb2JqLnBvc2l0aW9uLnkgPCAwKSBcbiAgICAgIG9iai52ZWxvY2l0eS55ID0gLW9iai52ZWxvY2l0eS55O1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXcoYykge1xuICBjLmJlZ2luUGF0aCgpO1xuICBjLmFyYyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkqMiwgZmFsc2UpO1xuICBjLmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gIGMuc3Ryb2tlKCk7XG4gIGMuZmlsbCgpO1xuICBjLmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5KTtcbiAgZWRnZUhhbmRsZXIuYm91bmNlKHRoaXMpO1xufVxuXG5sZXQgQmFsbCA9IChjb25maWcgPSB7fSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgbGV0IHBvc2l0aW9uID0gbmV3IFZlY3RvcihyZXN1bHQueCwgcmVzdWx0LnkpO1xuICBsZXQgdmVsb2NpdHkgPSBuZXcgVmVjdG9yKHJlc3VsdC5keCwgcmVzdWx0LmR5KTtcbiAgcmVzdWx0LnBvc2l0aW9uID0gcG9zaXRpb247XG4gIHJlc3VsdC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhbGw7XG4iLCJpbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IFN1YmplY3QgZnJvbSAnLi9zdWJqZWN0JztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xuXG5sZXQgY29sbGlzaW9uID0gbmV3IFN1YmplY3QoKTtcbmxldCBjb2xsaXNpb25IYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAvLyBUT0RPIG1ha2UgYSBiZXR0ZXIgY29sbGlzaW9uIGhhbmRsZXJcbiAgY29uc29sZS5sb2coZS5jb2xvciwgJ2dvIEJPT00nKTtcbn1cbmNvbGxpc2lvbi5zdWJzY3JpYmUoY29sbGlzaW9uSGFuZGxlcik7XG5cbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xudmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG52YXIgd2lkdGggPSA0ODA7XG52YXIgaGVpZ2h0ID0gMzIwO1xuY2FudmFzLndpZHRoID0gd2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xudmFyIGNsZWFyU3RhZ2UgPSAoKSA9PiBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xudmFyIGZwcyA9IDEwO1xudmFyIGdyYXZpdHkgPSBuZXcgVmVjdG9yKDAsIDAuMDEpO1xudmFyIHdpbmQgPSBuZXcgVmVjdG9yKDAuMDA1LCAwKTtcblxudmFyIGJhbGxzID0gW1xuICBuZXcgQmFsbCh7XG4gICAgeDogd2lkdGggLyAyLFxuICAgIHk6IGhlaWdodCAvIDJcbiAgfSksIG5ldyBCYWxsKHtcbiAgICB4OiAzMCxcbiAgICB5OiAzMCxcbiAgICByYWRpdXM6IDMwLFxuICAgIGNvbG9yOiBcInBpbmtcIixcbiAgfSksIG5ldyBCYWxsKHtcbiAgICB4OiA4MCxcbiAgICB5OiAzMCxcbiAgICByYWRpdXM6IDEwLFxuICAgIGNvbG9yOiBcInRvbWF0b1wiXG4gIH0pXG5dO1xuXG52YXIgZW52aXJvbm1lbnQgPSBbXG4gIGdyYXZpdHksXG4gIHdpbmRcbl07XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgY2xlYXJTdGFnZSgpO1xuXG4gIGJhbGxzLmZvckVhY2goYiA9PiB7XG4gICAgZW52aXJvbm1lbnQuZm9yRWFjaChmID0+IHtcbiAgICAgIGIudmVsb2NpdHkgPSBiLnZlbG9jaXR5LmFkZChmKTtcbiAgICB9KTtcbiAgICBcbiAgICBiYWxscy5maWx0ZXIob3RoZXJzID0+IG90aGVycyAhPT0gYikuZm9yRWFjaChvID0+IHtcbiAgICAgIC8vIEZJWE1FXG4gICAgICBsZXQgZGlzdGFuY2UgPSBiLnBvc2l0aW9uLm1pbnVzKG8ucG9zaXRpb24pLm1hZygpO1xuICAgICAgaWYgKGRpc3RhbmNlLnggPD0gYi5yYWRpdXMpIFxuICAgICAgICBjb25zb2xlLmxvZyhiLmNvbG9yLCAnQk9PTScpO1xuICAgICAgaWYgKGRpc3RhbmNlLnkgPD0gYi5yYWRpdXMpIFxuICAgICAgICBjb25zb2xlLmxvZyhiLmNvbG9yLCAnQkxBUCcpO1xuICAgIH0pO1xuXG4gICAgYi51cGRhdGUoKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgYmFsbHMuZm9yRWFjaChiID0+IGIuZHJhdyhjdHgpKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgdXBkYXRlKCk7XG4gIGRyYXcoKTtcbn1cbnNldEludGVydmFsKG1haW4sIGZwcyk7XG4iLCJ2YXIgU3ViamVjdCA9IGZ1bmN0aW9uKCkge1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcnM6IFtdLCAvLyBvYnNlcnZlcnNcblxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMucHVzaChmbik7XG4gICAgfSxcblxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihmbikge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZmlsdGVyKChpdGVtKSA9PiAoaXRlbSAhPT0gZm4pKSBcbiAgICB9LFxuXG4gICAgZmlyZTogZnVuY3Rpb24obywgdGhpc09iaikge1xuICAgICAgdmFyIHNjb3BlID0gdGhpc09iaiB8fCB3aW5kb3c7XG4gICAgICB0aGlzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVtLmNhbGwoc2NvcGUsIG8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YmplY3Q7XG4iLCJ2YXIgVmVjdG9yID0gZnVuY3Rpb24oeCA9IDAsIHkgPSAwKSB7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB4LFxuICAgIHksIHksXG4gICAgYWRkOiBmdW5jdGlvbih2KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XG4gICAgICByZXN1bHQueCArPSB2Lng7XG4gICAgICByZXN1bHQueSArPSB2Lnk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgbWludXM6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcbiAgICAgIHJlc3VsdC54IC09IHYueDtcbiAgICAgIHJlc3VsdC55IC09IHYueTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBtYWc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH0sXG4gICAgbm9ybTogZnVuY3Rpb24odikge1xuICAgICAgdmFyIHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xuICAgICAgdmFyIG1hZyA9IHRoaXMubWFnKCk7XG4gICAgICBpZiAobWFnID4gMSkge1xuICAgICAgICByZXN1bHQueCAvPSBtYWc7XG4gICAgICAgIHJlc3VsdC55IC89IG1hZztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBsaW1pdDogZnVuY3Rpb24obWF4KSB7XG4gICAgICAvLyBUT0RPXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiJdfQ==
