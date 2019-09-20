#!/usr/bin/env checkio --domain=js run middle-characters
'use strict';

function middle(text) {
  const center = text.length / 2;

  if (Number.isInteger(center)) {
    return text[center - 1] + text[center];
  }

  return text[Math.floor(center)];
}

const assert = require(`assert`);

if (!global.is_checking) {
  console.log(`Example:`);

  console.log(middle(`example`));

  // These "asserts" are used for self-checking and not for an auto-testing

  assert.equal(middle(`example`), `m`);

  assert.equal(middle(`test`), `es`);

  assert.equal(middle(`very-very long sentence`), `o`);

  assert.equal(middle(`I`), `I`);

  assert.equal(middle(`no`), `no`);

  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
