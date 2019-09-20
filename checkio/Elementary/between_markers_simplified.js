#!/usr/bin/env checkio --domain=js run between-markers-simplified
'use strict';

function betweenMarkers(text, begin, end) {
  const startIdx = text.indexOf(begin) + 1;
  const endIdx = text.indexOf(end);

  return text.slice(startIdx, endIdx);
}

const assert = require(`assert`);

if (!global.is_checking) {
  console.log(`Example:`);

  console.log(betweenMarkers(`What is >apple<`, `>`, `<`), `apple`);

  assert.equal(betweenMarkers(`What is >apple<`, `>`, `<`), `apple`);

  assert.equal(betweenMarkers(`What is [apple]`, `[`, `]`), `apple`);

  assert.equal(betweenMarkers(`What is ><`, `>`, `<`), ``);

  assert.equal(betweenMarkers(`>apple<`, `>`, `<`), `apple`);

  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
