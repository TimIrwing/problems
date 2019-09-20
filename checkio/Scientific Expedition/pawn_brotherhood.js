#!/usr/bin/env checkio --domain=js run pawn-brotherhood
`use strict`;

function safePawns(data) {
  let safe = 0;

  for (const entry of data) {
    if (isCapturable(data, entry)) ++safe;
  }

  return safe;

  function isCapturable(data, str) {
    const letters = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];

    return (
      isPawn(data, defencePoint(str, 1)) || isPawn(data, defencePoint(str, -1))
    );

    function defencePoint(str, direction) {
      const tmp = str.replace(str[1], Number(str[1]) - 1);

      const index = letters.indexOf(tmp[0]) + direction;

      if (index >= 0 && index <= 7) {
        return tmp.replace(tmp[0], letters[index]);
      }

      return tmp.replace(tmp[0], `x`);
    }
  }

  function isPawn(data, str) {
    const letters = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];

    if (letters.indexOf(str[0]) === -1 || Number(str[1]) < 1) return false;

    return data.indexOf(str) !== -1;
  }
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(
    safePawns([`b4`, `d4`, `f4`, `c3`, `e3`, `g5`, `d2`]),
    6,
    `First`
  );
  assert.equal(
    safePawns([`b4`, `c4`, `d4`, `e4`, `f4`, `g4`, `e5`]),
    1,
    `Second`
  );
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
