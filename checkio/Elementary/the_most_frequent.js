#!/usr/bin/env checkio --domain=js run the-most-frequent

// https://js.checkio.org/mission/the-most-frequent/

// You have a sequence of strings, and you’d like to determine the most frequently occurring string in the sequence.
//
// Input:a Array of strings.
//
// Output:a string.
//
//
// END_DESC

'use strict';

function mostFrequent(data) {
  const maxFrequency = {
    count: 0,
    entry: null,
  };
  let currentFrequency = 0;
  let previous = data[0];

  for (const entry of data) {
    if (entry !== previous) {
      currentFrequency = 1;
    } else {
      ++currentFrequency;
    }
    if (maxFrequency.count < currentFrequency) {
      maxFrequency.count = currentFrequency;
      maxFrequency.entry = previous;
    }
    previous = entry;
  }

  return maxFrequency.entry;
}
mostFrequent(['a', 'a', 'bi', 'bi', 'bi']);

const assert = require(`assert`);

if (!global.is_checking) {
  console.log(`Example:`);
  console.log(mostFrequent([`a`, `b`, `c`, `a`, `b`, `a`]));

  assert.equal(mostFrequent([`a`, `b`, `c`, `a`, `b`, `a`]), `a`);
  assert.equal(mostFrequent([`a`, `a`, `bi`, `bi`, `bi`]), `bi`);
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
