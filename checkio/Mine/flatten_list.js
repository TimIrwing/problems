#!/usr/bin/env checkio --domain=js run flatten-list
'use strict';

function flatList(array) {
    let notDone = true;

    while (notDone) {
        notDone = false;

        for (let i = 0; i < array.length; ++i) {
            if (typeof array[i] !== 'number') {
                notDone = true;

                const length = array[i].length;

                array = array
                    .slice(0, i)
                    .concat(array[i])
                    .concat(array.slice(i + 1));

                i += length - 1;
            }
        }
    }

    return array;
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(
        flatList([[[2]], [4, [5, 6, [6], 6, 6, 6], 7]]),
        [2, 4, 5, 6, 6, 6, 6, 6, 7],
        'Third'
    );

    assert.equal(flatList([1, [2, 2, 2], 4]), [1, 2, 2, 2, 4], 'Second');

    assert.equal(flatList([1, 2, 3]), [1, 2, 3], 'First');

    assert.equal(flatList([-1, [1, [-2], 1], -1]), [-1, 1, -2, 1, -1], 'Four');

    console.log(
        "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
    );
}
