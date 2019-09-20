const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), process.argv[2]);

const numbers = fs
    .readFileSync(filePath, { encoding: 'utf8' })
    .split('\r\n')
    .map((val) => Number(val));

console.log(countInversion(numbers));

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
