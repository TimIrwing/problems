#!/usr/bin/env checkio --domain=js run most-wanted-letter

// https://js.checkio.org/mission/most-wanted-letter/

// You are given a text, which contains different english letters and punctuation symbols.    You should find the most frequent letter in the text. The letter returned must be in lower case.
// While checking for the most wanted letter, casing does not matter, so for the purpose of your search,    "A" == "a".    Make sure you do not count punctuation symbols, digits and whitespaces, only letters.
//
// If you havetwo or more letters with the same frequency,    then return the letter which comes first in the latin alphabet.    For example -- "one" contains "o", "n", "e" only once for each, thus we choose "e".
//
// Input:A text for analysis as a string.
//
// Output:The most frequent letter in lower case as a string.
//
// Precondition:
// A text contains only ASCII symbols.
// 0 < len(text) ≤ 105
//
//
// END_DESC

"use strict";

function mostWanted(str) {
  str = str.match(/[a-z]/gi);

  for (let i = 0; i < str.length; ++i) {
    str[i] = str[i].toLowerCase();
  }

  const letterCountObj = [];

  outerLoop:
  for (const entry of str) {
    for (const obj of letterCountObj) {
      if (obj.letter === entry) {
        ++obj.count;
        continue outerLoop;
      }
    }
    letterCountObj.push({
      letter: entry, count: 1,
    });
  }

  const alphabet = `abcdefghijklmnopqrstuvwxyz`;
  const result = letterCountObj.sort((a, b) => {
    return alphabet.indexOf(a.letter) - alphabet.indexOf(b.letter);
  });

  let max = 0;
  let mostWantedLetter = `Error!`;
  result.map((obj) => {
    if (obj.count > max) {
      max = obj.count;
      mostWantedLetter = obj.letter;
    }
  });

  console.log(`\r\nDone\r\n`);
  return mostWantedLetter;
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(mostWanted(`Hello World!`), `l`, `1st example`);
  assert.equal(mostWanted(`How do you do?`), `o`, `2nd example`);
  assert.equal(mostWanted(`One`), `e`, `3rd example`);
  assert.equal(mostWanted(`Oops!`), `o`, `4th example`);
  assert.equal(mostWanted(`AAaooo!!!!`), `a`, `Letters`);
  console.log(`Coding complete? Click 'Check' to review your tests and earn cool rewards!`);
}
