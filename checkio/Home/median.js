#!/usr/bin/env checkio --domain=js run median

// https://js.checkio.org/mission/median/

// A median is a numerical value separating the upper half of asortedarray of numbers from the lower half.    In a list where there are an odd number of entities, the median is the number found in the middle of the array.    If the array contains an even number of entities, then there is no single middle value, instead the median becomes    the average of the two numbers found in the middle.    For this mission, you are given a non-empty array of natural numbers (X). With it, you must separate the upper half of    the numbers from the lower half and find the median.
//
// Input:An array as a list of integers.
//
// Output:The median as a float or an integer.
//
//
// Precondition:
// 1 < len(data) ≤ 1000
// all(0 ≤ x<10 ** 6 for x in data)
//
//
// END_DESC

'use strict';

function median(data) {
  let center = Math.floor(data.length / 2);
  data = data.sort((a, b) => {
    return a - b;
  });
  if (data.length % 2 === 1) {
    return data[center];
  } else {
    return (data[center] + data[center - 1]) / 2;
  }
}

var assert = require('assert');

if (!global.is_checking) {
  assert.equal(median([1, 2, 3, 4, 5]), 3, '1st example');
  assert.equal(median([3, 1, 2, 5, 3]), 3, '2nd example');
  assert.equal(median([1, 300, 2, 200, 1]), 2, '3rd example');
  assert.equal(median([3, 6, 20, 99, 10, 15]), 12.5, '4th example');
  console.log(
    "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
  );
}
