#!/usr/bin/env checkio --domain=js run when-is-friday
'use strict';

function friday(date) {
  const { day, month, year } = date.match(
    /(?<day>\d+)\.(?<month>\d+)\.(?<year>\d+)/
  ).groups;
  const weekday = new Date(year, month - 1, day).getDay();

  console.log(weekday);

  return [4, 3, 2, 1, 0, 6, 5][weekday - 1];
}

const assert = require(`assert`);

if (!global.is_checking) {
  console.log(`Example:`);

  console.log(friday(`23.04.2018`));

  // These "asserts" are used for self-checking and not for an auto-testing

  assert.deepEqual(friday(`23.04.2018`), 4);

  assert.deepEqual(friday(`01.01.1999`), 0);

  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
