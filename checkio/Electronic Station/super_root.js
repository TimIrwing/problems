#!/usr/bin/env checkio --domain=js run super-root

// https://js.checkio.org/mission/super-root/

// Square roots, cube roots, 4th roots... each one of them is too boring for Nicola.    He needs to find the super root! With your help he'll almost certainly achieve this goal.
//
// The super root of a numberNis the numberx,    such thatxx=N.
//
// The result should be accurate, so thatxx≈ N±0.001,    orN - 0.001 < xx< N + 0.001.
//
// Input:A number (N) as an integer.
//
// Output:The super root (x) as a float or an integer.
//
// Precondition:
// 1 ≤ number ≤ 10 ** 10
//
//
// END_DESC

'use strict';
const MINIMAL_STEP = 0.000000000000000001;

function superRoot(number) {
    let min = 0;
    let max = number;

    while (min < max) {
        const center = (min + max) / 2;
        const superPow = Math.pow(center, center);

        if (equals(superPow, number)) {
            min = center;
            break;
        } else if (superPow < number) {
            min = center + MINIMAL_STEP;
        } else {
            max = center - MINIMAL_STEP;
        }
    }

    return min;
}

function equals(num1, num2) {
    return num1 < num2 + 0.001 && num1 > num2 - 0.001;
}

const assert = require('assert');
if (!global.is_checking) {
    console.log('Example:');
    console.log(superRoot(10000000000));

    // These "asserts" using only for self-checking and not necessary for auto-testing
    function checkResult(func, number) {
        const result = func(number);
        const p = result ** result;
        if (number - 0.001 < p && p < number + 0.001) {
            return true;
        } else {
            return false;
        }
    }

    const firstTest = checkResult(superRoot, 4);
    const secondTest = checkResult(superRoot, 9);
    const thirdTest = checkResult(superRoot, 81);

    assert.equal(firstTest, true);
    assert.equal(secondTest, true);
    assert.equal(thirdTest, true);
    console.log("Coding complete? Click 'Check' to earn cool rewards!");
}
