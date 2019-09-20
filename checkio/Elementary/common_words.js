#!/usr/bin/env checkio --domain=js run common-words
'use strict';

function commonWords(first, second) {
  const firstArr = first.split(`,`);
  const secondArr = second.split(`,`);
  const result = [];

  for (const word of firstArr) {
    if (~secondArr.indexOf(word)) result.push(word);
  }

  return result.sort().join(`,`);
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(commonWords(`hello,world`, `hello,earth`), `hello`, `Hello`);
  assert.equal(
    commonWords(`one,two,three`, `four,five,six`),
    ``,
    `Too different`
  );
  assert.equal(
    commonWords(`one,two,three`, `four,five,one,two,six,three`),
    `one,three,two`,
    `1 2 3`
  );
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
