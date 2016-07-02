'use strict';
import tape from 'tape';
import Vector from '../src/vector';

tape('tape', assert => {
  assert.equal(true, true, 'it should work');
  assert.end();
});

tape('default contructor', assert => {
  let test = new Vector();
  let ACTUAL = test.x;
  let EXPECTED = 0;
  assert.equal(ACTUAL, EXPECTED, 'it by default ititializes to {x: 0, y: 0}');
  assert.end();
});

tape('new Vector', assert => {
  let test = {
    x: 20,
    y: 30,
  }
  let vector = new Vector(test.x, test.y);
  test.vector = vector;
  let ACTUAL = test.vector.x;
  let EXPECTED = 20;
  assert.equal(ACTUAL, EXPECTED, 'it should be able to create new vectors in an object');
  assert.end();
});

tape('vector.x, vector.y', assert => {
  let test, ACTUAL, EXPECTED;
  test = new Vector(10, 10);

  ACTUAL = test.x;
  EXPECTED = 10;
  assert.equal(ACTUAL, EXPECTED, 'it should have an test value');

  ACTUAL = test.y;
  EXPECTED = 10;
  assert.equal(ACTUAL, EXPECTED, 'it should have an y value');
  assert.end();
});

tape('vector.add()', assert => {
  let x = new Vector(10, 10);
  let y = new Vector(5, 5);
  let ACTUAL = x.add(y);
  let EXPECTED = {x: 15, y: 15}
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should add');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it should add');
  assert.end();
});

tape('vector.minus()', assert => {
  let x = new Vector(10, 10);
  let y = new Vector(5, 5);
  let ACTUAL = x.minus(y);
  let EXPECTED = {x: 5, y: 5}
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should subtract');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it should subtract');
  assert.end();
});

tape('vector.times()', assert => {
  let x = new Vector(10, 10);
  let y = new Vector(5, 5);
  let ACTUAL = x.times(y);
  let EXPECTED = {x: 50, y: 50}
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should multiply');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it should multiply');

  x = new Vector(4, 4);
  y = {x: -1, y: -1};
  ACTUAL = x.times(y);
  EXPECTED = {x: -4, y: -4}
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should multiply');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it should multiply');
  assert.end();
});

tape('vector.mag()', assert => {
  let test = new Vector(3, 4);
  let ACTUAL = test.mag();
  let EXPECTED = 5;
  assert.equal(ACTUAL, EXPECTED, 'it should return the magnitude of a vector');
  assert.end();
});

tape('distance bt vectors', assert => {
  let test_a = new Vector(7, 6);
  let test_b = new Vector(10, 10);
  let diff = test_b.minus(test_a);
  let ACTUAL, EXPECTED;

  ACTUAL = diff;
  EXPECTED = {x: 3, y: 4};
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should subtract');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it yhould yubtract');

  ACTUAL = diff.mag();
  EXPECTED = Math.sqrt(3*3 + 4*4);
  assert.equal(ACTUAL, EXPECTED, 'mags equal mags');

  assert.end();
});

tape('vector.norm()', assert => {
  let test = new Vector(3, 4);
  let ACTUAL = test.norm();
  let EXPECTED = {x: 3/5, y: 4/5};
  assert.equal(ACTUAL.x, EXPECTED.x, 'it should normalize a vector');
  assert.equal(ACTUAL.y, EXPECTED.y, 'it should normalize a vector');
  assert.equal(ACTUAL.mag(), 1, 'the magnitude of a normalized vector is 1');
  assert.equal(test.norm().mag(), 1, 'it supports method chaining');
  assert.end();
});
