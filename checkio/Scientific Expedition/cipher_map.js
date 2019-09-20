#!/usr/bin/env checkio --domain=js run cipher-map
'use strict';

function recallPassword(grille, password) {
  let localGrille = grilleToNumbers(grille);
  let result = ``;

  for (let i = 0; i < 4; ++i) {
    result += iterateOverGrille(localGrille, password);

    localGrille = rotateGrille(localGrille);
  }

  return result;

  function iterateOverGrille(grille, password) {
    let str = ``;

    for (let i = 0; i < grille.length; ++i) {
      for (let j = 0; j < grille[0].length; ++j) {
        if (grille[i][j]) {
          str += password[i][j];
        }
      }
    }

    return str;
  }

  function rotateGrille(grille) {
    const newGrille = [];

    for (let i = 0; i < grille[0].length; ++i) {
      const newLine = [];

      for (let j = grille.length - 1; j >= 0; --j) {
        if (grille[j][i]) {
          newLine.push(1);
        } else {
          newLine.push(0);
        }
      }

      newGrille.push(newLine);
    }

    return newGrille;
  }

  function grilleToNumbers(grille) {
    const newGrille = [];

    for (const line of grille) {
      const newLine = [];

      for (const symbol of line) {
        if (symbol === `X`) {
          newLine.push(1);
        } else {
          newLine.push(0);
        }
      }

      newGrille.push(newLine);
    }

    return newGrille;
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(
    recallPassword(
      [`X...`, `..X.`, `X..X`, `....`],
      [`itdf`, `gdce`, `aton`, `qrdi`]
    ),
    `icantforgetiddqd`,
    `First Example`
  );
  assert.equal(
    recallPassword(
      [`....`, `X..X`, `.X..`, `...X`],
      [`xhwc`, `rsqx`, `xqzz`, `fyzr`]
    ),
    `rxqrwsfzxqxzhczy`,
    `Second Example`
  );
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
