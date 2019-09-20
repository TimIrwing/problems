#!/usr/bin/env checkio --domain=js run count-inversions

// https://js.checkio.org/mission/count-inversions/

// In computer science and discrete mathematics,    aninversionis a pair of places in a sequence where the elements in these places are out of their natural order. So, if we use    ascending order for a group of numbers, then an inversion is when larger numbers appear before lower number in a    sequence.
//
// Check out this example sequence: (1, 2, 5, 3, 4, 7, 6) and we can see here three inversions
// - 5 and 3;    - 5 and 4;    - 7 and 6.
//
// You are given a sequence of unique numbers and you should count the number of inversions in this sequence.
//
// Input:A sequence as a tuple of integers.
//
// Output:The inversion number as an integer.
//
// Precondition:2 < len(sequence) < 200
// len(sequence) == len(set(sequence))
// all(-100 < x < 100 for x in sequence)
//
//
// END_DESC
'use strict';

function countInversion(arr) {
    return sortAndCount(arr)[1];
}

function sortAndCount(arr) {
    const length = arr.length;
    if (length === 1) return [arr, 0];

    const center = Math.floor(length / 2);

    const left = sortAndCount(arr.slice(0, center));
    const right = sortAndCount(arr.slice(center));
    const split = mergeAndCountSplitInv(left[0], right[0]);

    return [split[0], left[1] + right[1] + split[1]];
}

function mergeAndCountSplitInv(arr1, arr2) {
    let count = 0;
    const merged = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            ++i;
        } else {
            merged.push(arr2[j]);
            ++j;
            count += arr1.length - i;
        }
    }

    while (i < arr1.length) {
        merged.push(arr1[i]);
        ++i;
    }

    while (j < arr2.length) {
        merged.push(arr2[j]);
        ++j;
    }

    return [merged, count];
}

const assert = require(`assert`);

if (!global.is_checking) {
    console.log(`Example:`);
    console.log(countInversion([5, 3, 2, 1, 0]));

    assert.equal(countInversion([5, 3, 2, 1, 0]), 3, `Example`);
    assert.equal(countInversion([0, 1, 2, 3]), 0, `Sorted`);
    assert.equal(countInversion(), 1, `Two numbers`);
    assert.equal(countInversion([5, 3, 2, 1, 0]), 10, `Reversed`);
    console.log(
        `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
    );
}
