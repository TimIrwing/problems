#!/usr/bin/env checkio --domain=js run morse-clock
'use strict';

function morseClock(data) {
  const [_, hours, minutes, seconds] = data.match(/^(\d+):(\d+):(\d+)$/);

  return `${toMorse(hours, 2, 4)} : ${toMorse(minutes, 3, 4)} : ${toMorse(
    seconds,
    3,
    4
  )}`;

  function toMorse(num, ...bits) {
    const local = [...num];
    const binary = [];
    let result = ``;

    while (local.length < bits.length) {
      local.unshift(`0`);
    }

    for (let i = 0; i < local.length; ++i) {
      binary.push(adjustStrLength(numStrToBinaryStr(local[i]), bits[i]));
    }

    for (let i = 0; i < binary.length; ++i) {
      result += ` ${binToMorse(binary[i])} ${binToMorse(binary[++i])}`;
    }

    return result.trim();
  }

  function binToMorse(binaryNumberStr) {
    let result = ``;

    for (const digit of binaryNumberStr) {
      if (digit === `1`) {
        result += `-`;
      } else if (digit === `0`) {
        result += `.`;
      }
    }

    return result;
  }

  function adjustStrLength(str, length) {
    while (str.length < length) {
      str = `0` + str;
    }

    return str;
  }

  function numStrToBinaryStr(num) {
    return (Number(num) >>> 0).toString(2);
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(morseClock(`10:37:49`), `.- .... : .-- .--- : -.. -..-`, `1st`);
  assert.equal(morseClock(`21:34:56`), `-. ...- : .-- .-.. : -.- .--.`, `2nd`);
  assert.equal(morseClock(`00:1:02`), `.. .... : ... ...- : ... ..-.`, `3rd`);
  assert.equal(morseClock(`23:59:59`), `-. ..-- : -.- -..- : -.- -..-`, `4th`);
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
