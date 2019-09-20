#!/usr/bin/env checkio --domain=js run first-word-simplified
'use strict';

function firstWord(a) {
  return a.match(/^(\w+)(\s|$)/)[1];
}

var assert = require('assert');

if (!global.is_checking) {
  console.log('Example:');

  console.log(firstWord('Hello world'));

  // These "asserts" using for self-checking and not for auto-testing

  assert.equal(firstWord('Hello world'), 'Hello');

  assert.equal(firstWord('a word'), 'a');

  assert.equal(firstWord('hi'), 'hi');

  console.log("Coding complete? Click 'Check' to earn cool rewards!");
}
