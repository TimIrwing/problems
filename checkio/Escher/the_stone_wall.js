#!/usr/bin/env checkio --domain=js run the-stone-wall
'use strict';

function stoneWall(wall) {
  const layers = wall.match(/(#|0)(.|\s)*\1/)[0].split(`\n`);
  const weakestSpot = {
    index: -1,
    wallSegments: Infinity,
  };

  for (let i = 0; i < layers[0].length; ++i) {
    const wallSegments = layers.reduce((acc, cur) => {
      acc += cur[i] === `#` ? 1 : 0;
      return acc;
    }, 0);

    if (wallSegments < weakestSpot.wallSegments) {
      weakestSpot.wallSegments = wallSegments;
      weakestSpot.index = i;
    }
  }

  return weakestSpot.index;
}

const assert = require(`assert`);
if (!global.is_checking) {
  console.log(`Example:`);
  console.log(
    stoneWall(`
##########
####0##0##
00##0###00
`)
  );

  // These "asserts" are used for self-checking and not for an auto-testing
  assert.equal(
    stoneWall(`
##########
####0##0##
00##0###00
`),
    4
  );

  assert.equal(
    stoneWall(`
#00#######
#######0##
00######00
`),
    1
  );

  assert.equal(
    stoneWall(`
#####
#####
#####
`),
    0
  );

  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
