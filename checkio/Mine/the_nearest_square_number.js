#!/usr/bin/env checkio --domain=js run the-nearest-square-number
'use strict';

function nearestSquare(number) {
    const sqrt = Math.sqrt(number);
    const lowerSquare = Math.pow(Math.floor(sqrt), 2);
    const higherSquare = Math.pow(Math.ceil(sqrt), 2);

    if (number - lowerSquare > higherSquare - number) return higherSquare;

    return lowerSquare;
}

const assert = require('assert');

if (!global.is_checking) {
    console.log('Example:');

    console.log(nearestSquare(8));

    // These "asserts" are used for self-checking and not for an auto-testing

    assert.equal(nearestSquare(8), 9);

    assert.equal(nearestSquare(13), 16);

    assert.equal(nearestSquare(24), 25);

    assert.equal(nearestSquare(9876), 9801);

    console.log("Coding complete? Click 'Check' to earn cool rewards!");
}
