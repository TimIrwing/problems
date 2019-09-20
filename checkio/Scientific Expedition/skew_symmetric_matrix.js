#!/usr/bin/env checkio --domain=js run skew-symmetric-matrix
'use strict';

function symmetric(matrix) {
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      if (matrix[i][j] !== -matrix[j][i]) return false;
    }
  }

  return true;
}

const assert = require(`assert`);
if (!global.is_checking) {
  console.log(`Example:`);
  console.log(symmetric([[0, 1, 2], [-1, 0, 1], [-2, -1, 0]]));

  // These "asserts" using only for self-checking and not necessary for auto-testing

  assert.equal(symmetric([[0, 1, 2], [-1, 0, 1], [-2, -1, 0]]), true);
  assert.equal(symmetric([[0, 1, 2], [-1, 1, 1], [-2, -1, 0]]), false);
  assert.equal(symmetric([[0, 1, 2], [-1, 0, 1], [-3, -1, 0]]), false);
  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
