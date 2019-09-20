#!/usr/bin/env checkio --domain=js run roman-numerals

// https://js.checkio.org/mission/roman-numerals/

// .numeral-table {    margin: auto;    border-collapse: collapse;    text-align: center;  }  .numeral-table * {    border: 1px solid black;    padding: 8px;    width: 50%;  }
// END_DESC

"use strict";

function romanNumerals(number) {
  const str    = String(number);
  const length = str.length;
  let result = ``;

  if (length > 0) {
    result = toRoman( Number( str[length - 1] ), `I`, `V`, `X` );
  }

  if (length > 1) {
    result = toRoman( Number( str[length - 2] ), `X`, `L`, `C` ) + result;
  }

  if (length > 2) {
    result = toRoman( Number( str[length - 3] ), `C`, `D`, `M` ) + result;
  }

  if (length > 3) {
    for (let i = 0; i < Number( str[length - 4] ); ++i) {
      result = `M` + result;
    }
  }

  return result;

  function toRoman(num, leftSymb, middleSymb, rightSymb) {
    if (num === 0) return ``;
    let result = ``;

    switch (num) {
      case 1:
      case 2:
      case 3:
        for (let i = 0; i < num; ++i) {
          result += leftSymb;
        }
        break;

      case 4:
        result = leftSymb + middleSymb;
        break;

      case 5:
        result = middleSymb;
        break;

      case 6:
      case 8:
      case 7:
        result = middleSymb;
        for (let i = 5; i < num; ++i) {
          result += leftSymb;
        }
        break;

      case 9:
        result = leftSymb + rightSymb;
        break;
    }

    return result;
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(romanNumerals(6), `VI`, `First`);
  assert.equal(romanNumerals(76), `LXXVI`, `Second`);
  assert.equal(romanNumerals(499), `CDXCIX`, `Third`);
  assert.equal(romanNumerals(3888), `MMMDCCCLXXXVIII`, `Forth`);
  console.log(`Done! Go Check!`);
}
