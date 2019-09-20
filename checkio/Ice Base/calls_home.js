#!/usr/bin/env checkio --domain=js run calls-home
'use strict';

function totalCost(calls) {
  let prevDate;
  let cost = 1;
  let result = 0;
  for (const str of calls) {
    const date = str.slice(0, str.indexOf(' '));
    const duration = toMinutes(str.slice(str.lastIndexOf(' ') + 1));

    cost = date === prevDate ? cost : 1;

    const moreThanLimited = duration - 100;

    if (moreThanLimited >= 0) {
      result += 100 + moreThanLimited * 2;
      cost = 2;
    } else {
      result += duration;
    }

    console.log(date, duration);
    prevDate = date;
  }

  return result;
}

function toMinutes(seconds) {
  return Math.ceil(seconds / 60);
}

const assert = require('assert');

if (!global.is_checking) {
  assert.equal(
    totalCost([
      '2014-01-01 01:12:13 181',

      '2014-01-02 20:11:10 600',

      '2014-01-03 01:12:13 6009',

      '2014-01-03 12:13:55 200',
    ]),
    124,
    'Base example'
  );

  assert.equal(
    totalCost([
      '2014-02-05 01:00:00 1',

      '2014-02-05 02:00:00 1',

      '2014-02-05 03:00:00 1',

      '2014-02-05 04:00:00 1',
    ]),
    4,
    'Short calls but money...'
  );

  assert.equal(
    totalCost([
      '2014-02-05 01:00:00 60',

      '2014-02-05 02:00:00 60',

      '2014-02-05 03:00:00 60',

      '2014-02-05 04:00:00 6000',
    ]),
    106,
    'Precise calls'
  );

  console.log(
    "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
  );
}
