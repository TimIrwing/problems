const fs = require('fs');
const inputPath = process.argv[2];

const numbers = fs
    .readFileSync(inputPath, { encoding: 'utf8' })
    .split(/\s+/)
    .filter((val) => val !== '')
    .map(Number);

console.log(quickSort(numbers));

fs.writeFileSync('output.txt', numbers.join('\n') + '\n');

function quickSort(arr, l = 0, r = arr.length - 1) {
    if (r <= l) return 0;

    let count = r - l;

    // Question 1
    // const pivot = arr[l];

    // Question 2
    // swap(arr, l, r);
    // const pivot = arr[l];

    // Question 3
    const middle = Math.floor((l + r) / 2);
    const memo = {
        [arr[l]]: l,
        [arr[middle]]: middle,
        [arr[r]]: r,
    };
    const median = Object.keys(memo).map(Number).sort((a, b) => a - b)[1];

    swap(arr, l, memo[median]);

    const pivot = arr[l];

    // end of question 3

    let i = l + 1;

    for (let j = i; j <= r; ++j) {
        const current = arr[j];

        if (current < pivot) {
            swap(arr, i, j);
            ++i;
        }
    }

    swap(arr, l, i - 1);

    count += quickSort(arr, l, i - 2);
    count += quickSort(arr, i, r);

    return count;
}

function swap(arr, index1, index2) {
    if (index1 === index2) return;

    arr[index1] = [arr[index2], (arr[index2] = arr[index1])][0];
}
