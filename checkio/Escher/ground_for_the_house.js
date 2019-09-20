#!/usr/bin/env checkio --domain=js run ground-for-the-house
`use strict`;

function house(plan) {
    if (plan.indexOf(`#`) === -1) return 0;

    const area = areaTrim(plan.split(`\n`));

    const dimensions = area.length * area[0].length;

    return dimensions;

    function areaTrim(area, sides = [`upper`, `bottom`, `left`, `right`]) {
        let result = [...area];

        for (const side of sides) {
            while (isBlankLine(result, side)) {
                result = trimLine(result, side);
            }
        }

        return result;
    }

    function isBlankLine(area, side) {
        switch (side[0].toLowerCase()) {
            case `u`:
                return area[0].indexOf(`#`) === -1;

            case `b`:
                return area[area.length - 1].indexOf(`#`) === -1;

            case `l`:
                for (const line of area) {
                    if (line[0] === `#`) return false;
                }
                return true;

            case `r`:
                for (const line of area) {
                    if (line[line.length - 1] === `#`) return false;
                }
                return true;

            default:
                throw Error(`Side is not correct`);
        }
    }

    function trimLine(area, side) {
        const result = [];

        switch (side[0].toLowerCase()) {
            case `u`:
                return area.slice(1);

            case `b`:
                return area.slice(0, area.length - 1);

            case `l`:
                for (const line of area) {
                    result.push(line.slice(1));
                }

                return result;

            case `r`:
                for (const line of area) {
                    result.push(line.slice(0, line.length - 1));
                }

                return result;

            default:
                throw Error(`Side is not correct`);
        }
    }
}

const assert = require(`assert`);
if (!global.is_checking) {
    console.log(`Example:`);
    console.log(
        house(`
0000000
##00##0
######0
##00##0
#0000#0
`)
    );

    // These "asserts" are used for self-checking and not for an auto-testing
    assert.equal(
        house(`
0000000
##00##0
######0
##00##0
#0000#0
`),
        24
    );

    assert.equal(
        house(`0000000000
#000##000#
##########
##000000##
0000000000
`),
        30
    );

    assert.equal(
        house(`0000
0000
#000
`),
        1
    );

    assert.equal(
        house(`0000
0000
`),
        0
    );

    assert.equal(
        house(`0##0
0000
#00#
`),
        12
    );

    console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
