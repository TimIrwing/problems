#!/usr/bin/env checkio --domain=js run wild-dogs
'use strict';

function wildDogs(coords) {
    const dogsCount = coords.length;
    const max = {
        count: 0,
        lines: [],
    };

    for (let i = 0; i < dogsCount; ++i) {
        const current = coords[i];

        for (let j = i + 1; j < dogsCount; ++j) {
            const next = coords[j];
            const pointsToCheck = coords.slice(j + 1);
            let count = 2;

            const line = getLineInfo(current, next);

            pointsToCheck.forEach((val) => {
                if (onLine(val, line)) ++count;
            });

            if (count === max.count) {
                max.lines.push(line);
            } else if (count > max.count) {
                max.lines = [];
                max.lines.push(line);
                max.count = count;
            }
        }
    }

    return minDistance(max.lines);
}

function minDistance(arr) {
    const distances = [];

    arr.forEach((val) => {
        distances.push(distanceToStart(val));
    });

    return Math.min(...distances);
}

function distanceToStart(line) {
    const { slope, yIntercept, xIntercept } = line;

    if (yIntercept === 'any' || yIntercept === null) {
        return Math.abs(xIntercept);
    }

    if (xIntercept === 'any' || xIntercept === null) {
        return Math.abs(yIntercept);
    }

    const perpendicular = {
        slope: 1 / slope * -1,
        yIntercept: 0,
        xIntercept: 0,
    };

    const x =
        (perpendicular.yIntercept - yIntercept) / (slope - perpendicular.slope);

    const y = slope * x + yIntercept;

    return Math.sqrt(x ** 2 + y ** 2).toFixed(2);
}

function onLine(point, line) {
    const [x, y] = point;
    const { slope, yIntercept, xIntercept } = line;

    if (yIntercept === 'any' || yIntercept === null) return x === xIntercept;

    if (xIntercept === 'any' || xIntercept === null) return y === yIntercept;

    return y === slope * x + yIntercept;
}

function getLineInfo(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    let slope = (startY - endY) / (startX - endX);
    if (slope === -Infinity || slope === -0) slope = Math.abs(slope);

    const [xIntercept, yIntercept] = getIntercepts(slope, start);

    return { slope: slope, xIntercept: xIntercept, yIntercept: yIntercept };
}

function getIntercepts(slope, point) {
    const [x, y] = point;

    let xIntercept;
    let yIntercept;

    if (slope !== 0 && slope !== Infinity) {
        yIntercept = y - slope * x;
        xIntercept = x - y / slope;
    } else if (slope === Infinity) {
        if (x === 0) {
            yIntercept = 'any';
        } else {
            yIntercept = null;
        }

        xIntercept = x;
    } else {
        if (y === 0) {
            xIntercept = 'any';
        } else {
            xIntercept = null;
        }

        yIntercept = y;
    }

    return [xIntercept, yIntercept];
}

const assert = require('assert');
if (!global.is_checking) {
    console.log('Example:');
    console.log(
        wildDogs([
            [7, 122],
            [8, 139],
            [9, 156],
            [10, 173],
            [11, 190],
            [-100, 1],
        ])
    );

    // These "asserts" are used for self-checking and not for an auto-testing
    assert.equal(
        wildDogs([
            [7, 122],
            [8, 139],
            [9, 156],
            [10, 173],
            [11, 190],
            [-100, 1],
        ]),
        0.18
    );

    assert.equal(wildDogs([[6, -0.5], [3, -5], [1, -20]]), 3.63);

    assert.equal(wildDogs([[10, 10], [13, 13], [21, 18]]), 0);

    console.log("Coding complete? Click 'Check' to earn cool rewards!");
}
