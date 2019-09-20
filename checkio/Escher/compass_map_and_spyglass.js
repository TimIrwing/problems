#!/usr/bin/env checkio --domain=js run compass-map-and-spyglass
'use strict';

function navigation(seaside) {
  const toC = findPathLength(seaside, `Y`, `C`);
  const toM = findPathLength(seaside, `Y`, `M`);
  const toS = findPathLength(seaside, `Y`, `S`);

  return toC + toM + toS;

  function findPathLength(matrix, start, finish) {
    const startCoordinates = findCoordinates(matrix, start);
    const finishCoordinates = findCoordinates(matrix, finish);

    return findLengthFromCoordinates(startCoordinates, finishCoordinates);
  }

  function findCoordinates(matrix, point) {
    for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix[i].length; ++j) {
        if (matrix[i][j] === point) {
          return [i, j];
        }
      }
    }
  }

  function findLengthFromCoordinates(start, finish) {
    let pathLength = 0;

    while (start[0] !== finish[0] || start[1] !== finish[1]) {
      start = makeStep(start, finish);
      ++pathLength;
    }

    return pathLength;
  }

  function makeStep([startX, startY], [finishX, finishY]) {
    let xStep = 0;
    let yStep = 0;

    if (startX > finishX) {
      --xStep;
    } else if (startX < finishX) {
      ++xStep;
    }
    if (startY > finishY) {
      --yStep;
    } else if (startY < finishY) {
      ++yStep;
    }

    return [startX + xStep, startY + yStep];
  }
}

const assert = require(`assert`);
if (!global.is_checking) {
  console.log(`Example:`);
  console.log(
    navigation([
      [`Y`, 0, 0, 0, `C`],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [`M`, 0, 0, 0, `S`],
    ])
  );

  // These "asserts" are used for self-checking and not for an auto-testing
  assert.equal(
    navigation([
      [`Y`, 0, 0, 0, `C`],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [`M`, 0, 0, 0, `S`],
    ]),
    11
  );

  assert.equal(navigation([[0, 0, `C`], [0, `S`, 0], [`M`, `Y`, 0]]), 4);

  assert.equal(
    navigation([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, `M`, 0, `S`, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, `C`, 0, 0, 0],
      [0, `Y`, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]),
    9
  );
  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
