#!/usr/bin/env checkio --domain=js run create-intervals

// https://js.checkio.org/mission/create-intervals/

// From a Array of Integers you have to create a list of closed intervals as Arrays, so the  intervals are covering all the values found in the set.
//
// A closed interval includes its endpoints! The interval1..5, for example,  includes each valuexthat satifies the condition 1<=x<=5.
//
// Values can only be in the same interval if the difference between a value and the next  smaller value in the set equals one, otherwise a new interval begins. Of course, the  start value of an interval is excluded from this rule.
// A single value, that does not fit into an existing interval becomes the start- and  endpoint of a new interval.
//
// Input:Array of Integers.
//
// Output:Array of Array of two Integers, indicating the endpoints of the interval. The Array should be sorted by start point of each interval
//
//
// END_DESC

'use strict';

function createIntervals(data) {
  const localArr = data.sort((a, b) => a - b);
  const intervals = [];
  let intervalStart = localArr[0];

  for (let i = 0; i < localArr.length; ++i) {
    const prev = localArr[i - 1];
    const current = localArr[i];
    const next = localArr[i + 1];

    if (next === undefined || next - current > 1) {
      if (current - prev > 1) {
        intervals.push([current, current]);
      } else {
        intervals.push([intervalStart, current]);
      }
      intervalStart = next;
    }
  }

  return intervals;
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.deepEqual(
    createIntervals([1, 2, 3, 4, 5, 7, 8, 12]),
    [[1, 5], [7, 8], [12, 12]],
    `First`
  );
  assert.deepEqual(
    createIntervals([1, 2, 3, 6, 7, 8, 4, 5]),
    [[1, 8]],
    `Second`
  );
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
