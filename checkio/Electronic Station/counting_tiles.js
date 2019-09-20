#!/usr/bin/env checkio --domain=js run counting-tiles

// https://js.checkio.org/mission/counting-tiles/

// Stephan needs some help building a circular landing zone using the ice square tiles for their new Ice Base.    Before he converts the area to a construction place, Stephan needs to figure out how many square tiles he will need.
//
// Each square tile has size of 1x1 meters.     You need to calculate how many whole and partial tiles are needed for a circle with a radius of N meters.     The center of the circle will be at the intersection of four tiles. For example: a circle with a radius of 2 metres    requires 4 whole tiles and 12 partial tiles.
//
// Input:The radius of a circle as a float
//
// Output:The quantities whole and partial tiles as a list with two integers -- [solid, partial].
//
// Precondition:
// 0 < radius ≤ 4
//
//
//
// END_DESC
'use strict';

function countingTiles(radius) {
  let solid = 0;
  let partial = 0;

  for (let i = 1; i <= Math.floor(radius) + 1; ++i) {
    for (let j = 1; j <= Math.floor(radius) + 1; ++j) {
      if (isSolid(i, j, radius)) {
        solid += 4;
      } else if (isPartial(i, j, radius)) {
        partial += 4;
      }
    }
  }

  return [solid, partial];

  function isSolid(x, y, r) {
    return (
      inCircle(x, y, r) &&
      inCircle(x - 1, y, r) &&
      inCircle(x, y - 1, r) &&
      inCircle(x - 1, y - 1, r)
    );
  }

  function isPartial(x, y, r) {
    return (
      inCircle(x, y, r) ||
      inCircle(x - 1, y, r) ||
      inCircle(x, y - 1, r) ||
      inCircle(x - 1, y - 1, r)
    );
  }

  function inCircle(x, y, r) {
    return distance(x, y, 0, 0) < r;
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

var assert = require('assert');

if (!global.is_checking) {
  assert.deepEqual(countingTiles(2), [4, 12], 'N=2');
  assert.deepEqual(countingTiles(3), [16, 20], 'N=3');
  assert.deepEqual(countingTiles(2.1), [4, 20], 'N=2.1');
  assert.deepEqual(countingTiles(2.5), [12, 20], 'N=2.5');
  console.log(
    "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
  );
}
