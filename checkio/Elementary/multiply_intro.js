#!/usr/bin/env checkio --domain=js run multiply-intro
"use strict";



function multTwo(a, b) {

    return a * b;

}



var assert = require('assert');

if (!global.is_checking) {

    console.log('Example:');

    console.log(multTwo(3, 2));



    // These "asserts" are used for self-checking and not for an auto-testing

    assert.equal(multTwo(3, 2), 6);

    assert.equal(multTwo(1, 0), 0);

    console.log("Coding complete? Click 'Check' to earn cool rewards!");

}