#!/usr/bin/env checkio --domain=js run reverse-roman-numerals
'use strict';

function reverseRoman(roman) {
  let ones;
  let tens;
  let hundreds;
  let thousands;

  [ones, roman] = parseDigit(roman, `I`, `V`, `X`);
  [tens, roman] = parseDigit(roman, `X`, `L`, `C`);
  [hundreds, roman] = parseDigit(roman, `C`, `D`, `M`);
  [thousands, roman] = parseDigit(roman, `M`);

  return ones + tens * 10 + hundreds * 100 + thousands * 1000;
}

function parseDigit(str, x, y, z) {
  const regexp = new RegExp(`${y + x}{0,3}|${x + y}|${x}${z}|${x}{1,3}`, ``);
  let match = str.match(regexp) ? str.match(regexp)[0] : ``;
  let result = 0;

  if (~match.indexOf(y)) {
    if (~match.indexOf(`${x}${y}`)) {
      result = 4;
    } else {
      result = 5;
      while (~match.indexOf(x)) {
        match = match.replace(x, ``);
        ++result;
      }
    }
  } else if (~match.indexOf(z)) {
    result = 9;
  } else {
    while (~match.indexOf(x)) {
      match = match.replace(x, ``);
      ++result;
    }
  }

  return [result, str.replace(match, ``)];
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(reverseRoman(`VI`), 6, `First`);

  assert.equal(reverseRoman(`LXXVI`), 76, `Second`);

  assert.equal(reverseRoman(`CDXCIX`), 499, `Third`);

  assert.equal(reverseRoman(`MMMDCCCLXXXVIII`), 3888, `Forth`);

  console.log(
    `Coding complete, Cesar? Click 'Check' to review your tests and earn cool rewards!`
  );
}
