#!/usr/bin/env checkio --domain=js run number-radix

// https://js.checkio.org/mission/number-radix/

//
// END_DESC

'use strict';

function numberRadix(numberStr, radix) {
  const num = parseInt(numberStr, radix).toString(10);

  if (numbersEqual(numberStr, radix, num)) {
    return -1;
  }
  return Number(num);

  function numbersEqual(str, radix, base10) {
    return (
      !(parseInt(num, 10).toString(radix).toUpperCase() === numberStr) ||
      isNaN(num)
    );
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(numberRadix(`AF`, 16), 175, `Hex`);
  assert.equal(numberRadix(`101`, 2), 5, `Bin`);
  assert.equal(numberRadix(`101`, 5), 26, `5 base`);
  assert.equal(numberRadix(`Z`, 36), 35, `Z base`);
  assert.equal(numberRadix(`AB`, 10), -1, `B > A > 10`);
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
