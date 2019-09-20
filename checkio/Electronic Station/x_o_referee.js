#!/usr/bin/env checkio --domain=js run x-o-referee

// https://js.checkio.org/mission/x-o-referee/

// Tic-Tac-Toe, sometimes also known as Xs and Os, is a game for two players    (X and O) who take turns marking the spaces in a 3Ă3 grid.    The player who succeeds in placing three respective marks in a horizontal, vertical, or diagonal rows (NW-SE and    NE-SW) wins the game.
//
// But we will not be playing this game. You will be the referee for this games results. You are given a result of a    game and you must determine if the game ends in a win or a draw as well as who will be the winner. Make sure to    return "X"    if the X-player wins and "O" if the O-player wins. If the game is a draw, return "D".
//
//
//
// A game's result is presented as a list of strings, where "X" and "O" are players' marks and "." is the empty cell.
//
// Input:A game result as a list of strings (unicode).
//
// Output:"X", "O" or "D" as a string.
//
//
// END_DESC

'use strict';

function xoReferee(data) {
  const x = isWinner(data, `X`);
  const o = isWinner(data, `O`);

  if (x) {
    return `X`;
  } else if (o) {
    return `O`;
  } else {
    return `D`;
  }
}

function isWinner(data, str) {
  for (const line of data) {
    const tmp = line.replace(new RegExp(`${str}`, `g`), ``);
    if (tmp.length === 0) return true;
  }

  for (let i = 0; i < 3; ++i) {
    let count = -3;

    for (const line of data) {
      if (line[i] === str) ++count;
    }

    if (!count) {
      return true;
    }
  }

  if (data[1][1] === str) {
    if (
      (data[0][0] === str && data[2][2] === str) ||
      (data[0][2] === str && data[2][0] === str)
    ) {
      return true;
    }
  }

  return false;
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(xoReferee([`X.O`, `XX.`, `XOO`]), `X`, `Xs wins`);

  assert.equal(xoReferee([`OO.`, `XOX`, `XOX`]), `O`, `Os wins`);

  assert.equal(xoReferee([`OOX`, `XXO`, `OXX`]), `D`, `Draw`);

  assert.equal(xoReferee([`O.X`, `XX.`, `XOO`]), `X`, `Xs wins again`);

  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
