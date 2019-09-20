#!/usr/bin/env checkio --domain=js run matrix-pattern
'use strict';

function matrix(pattern, image) {
  for (let i = 0; i <= image.length - pattern.length; ++i) {
    for (let j = 0; j <= image[i].length - pattern[0].length; ++j) {
      markPattern([image, [i, j]], pattern);
    }
  }

  return image;
}

function markPattern(image, pattern) {
  const patternMatrix = image[0];
  const [x, y] = image[1];
  let isNotPattern = false;

  for (let i = x; i - x < pattern.length; ++i) {
    for (let j = y; j - y < pattern[0].length; ++j) {
      if (patternMatrix[i][j] !== pattern[i - x][j - y]) {
        isNotPattern = true;
        break;
      }
    }
  }

  if (isNotPattern) return;

  for (let i = x; i - x < pattern.length; ++i) {
    for (let j = y; j - y < pattern[0].length; ++j) {
      patternMatrix[i][j] += 2;
    }
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  // These "asserts" are used for self-checking and not for an auto-testing

  assert.deepEqual(
    matrix(
      [[1, 0], [1, 1]],
      [
        [0, 1, 0, 1, 0],

        [0, 1, 1, 0, 0],

        [1, 0, 1, 1, 0],

        [1, 1, 0, 1, 1],

        [0, 1, 1, 0, 0],
      ]
    ),
    [
      [0, 3, 2, 1, 0],

      [0, 3, 3, 0, 0],

      [3, 2, 1, 3, 2],

      [3, 3, 0, 3, 3],

      [0, 1, 1, 0, 0],
    ]
  );

  assert.deepEqual(
    matrix([[1, 1], [1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]]),
    [[3, 3, 1], [3, 3, 1], [1, 1, 1]]
  );

  assert.deepEqual(
    matrix(
      [[0, 1, 0], [1, 1, 1]],
      [
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],

        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],

        [0, 1, 0, 0, 1, 1, 1, 0, 1, 0],

        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],

        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],

        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],

        [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    ),
    [
      [0, 2, 3, 2, 0, 0, 0, 2, 3, 2],

      [0, 3, 3, 3, 0, 0, 0, 3, 3, 3],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 2, 3, 2, 0, 0, 0],

      [2, 3, 2, 0, 3, 3, 3, 0, 1, 0],

      [3, 3, 3, 0, 0, 0, 0, 0, 1, 1],

      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],

      [0, 0, 1, 0, 0, 0, 2, 3, 2, 0],

      [0, 1, 1, 0, 0, 0, 3, 3, 3, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  );

  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
