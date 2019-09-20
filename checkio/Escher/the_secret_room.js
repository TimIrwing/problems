#!/usr/bin/env checkio --domain=js run the-secret-room
'use strict';

const ones = {
    0: '',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
};
const tens = {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
};

function secretRoom(number) {
    const arr = [];

    for (let i = 1; i <= number; ++i) {
        arr.push({ num: i, str: numberToText(i) });
    }

    arr.sort((a, b) => a.str.localeCompare(b.str));

    return posOfNum(arr, number);
}

function posOfNum(arr, num) {
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i].num === num) return i + 1;
    }

    return -1;
}

function numberToText(num) {
    const digits = String(num)
        .match(/(\d)/g)
        .reverse()
        .map((val) => Number(val));

    let str = '';

    const first = digits[0];
    const second = digits[1];
    const third = digits[2];
    const fourth = digits[3];

    if (second === 1 && second !== undefined) {
        str += tens[second * 10 + first];
    } else if (second !== undefined && second !== 0) {
        str += tens[second] + ' ' + ones[first];
    } else {
        str += ones[first];
    }

    if (third !== undefined && third !== 0) {
        str = ones[third] + ' hundred ' + str;
    }

    if (fourth !== undefined) {
        str = ones[fourth] + ' thousand ' + str;
    }

    return str.trim();
}

const assert = require('assert');
if (!global.is_checking) {
    console.log('Example:');
    console.log(secretRoom(5));

    // These "asserts" are used for self-checking and not for an auto-testing
    assert.equal(secretRoom(5), 1); // five, four, one, three, two
    assert.equal(secretRoom(3), 2); // one, three, two
    assert.equal(secretRoom(1000), 551);
    console.log("Coding complete? Click 'Check' to earn cool rewards!");
}
