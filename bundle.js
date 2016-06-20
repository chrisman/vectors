(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaults = {
  width: 480,
  height: 320,
  x: 100,
  y: 100,
  size: 20,
  color: "green",
  dx: 2,
  dy: 2,
  update: function update() {
    var warp = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    if (warp) {
      this.x = this.x > this.width ? 0 : this.x + this.dx;
      this.y = this.y > this.height ? 0 : this.y + this.dy;
    } else if (!warp) {
      if (this.y + this.dy < this.size || this.y + this.size + this.dy > this.height) this.dy = -this.dy;
      if (this.x + this.dx < this.size || this.x + this.size + this.dx > this.width) this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
  },
  draw: function draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
    c.closePath();
  }
};

var Ball = function Ball() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return Object.assign({}, defaults, config);
};

exports.default = Ball;

},{}],2:[function(require,module,exports){
"use strict";

var _ball = require("./ball");

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 480;
var height = 320;
canvas.width = width;
canvas.height = height;
var fps = 10;

var balls = [new _ball2.default(), new _ball2.default({
  x: 30,
  y: 30,
  size: 30,
  color: "pink",
  dx: 3,
  dy: 0.5
}), new _ball2.default({
  x: 50,
  y: 50,
  size: 10,
  dx: 2,
  dy: 4,
  color: "tomato"
})];

function update() {
  ctx.clearRect(0, 0, width, height);
  balls.forEach(function (b) {
    return b.update();
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

},{"./ball":1}]},{},[2]);
