#!/usr/bin/env checkio --domain=js run bird-language
'use strict';

const VOWELS = `aeiouy`;

function translate(phrase) {
  return replaceExcessVowels(fixConsonants(phrase));

  function fixConsonants(str) {
    for (let i = 0; i < str.length; ++i) {
      if (!~VOWELS.indexOf(str[i]) && !str[i].match(/\s/)) {
        if (str.length - i > 2) {
          str = str.slice(0, i + 1) + str.slice(i + 2);
        } else {
          str = str.slice(0, i + 1);
        }
      }
    }

    return str;
  }

  function replaceExcessVowels(str) {
    let count = 0;
    let prev = str[0];

    for (let i = 0; i < str.length; ++i) {
      if (str[i] === prev && ~VOWELS.indexOf(str[i])) {
        ++count;
      } else {
        count = 1;
      }

      if (count >= 3) {
        str = str.slice(0, i - 2) + str.slice(i);
        count = 0;
        i -= 2;
      }

      prev = str[i];
    }

    return str;
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  console.log(`Example:`);
  console.log(translate(`hieeelalaooo`), `\nhello`);

  assert.equal(translate(`hieeelalaooo`), `hello`, `Hi!`);
  assert.equal(
    translate(`hoooowe yyyooouuu duoooiiine`),
    `how you doin`,
    `Joey?`
  );
  assert.equal(translate(`aaa bo cy da eee fe`), `a b c d e f`, `Alphabet`);
  assert.equal(translate(`sooooso aaaaaaaaa`), `sos aaa`, `Mayday, mayday`);

  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
