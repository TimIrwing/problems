function maxSequence(arr) {
    if (arr.length === 0 || onlyNegatives(arr)) return 0;
    if (arr.length === 1) return arr[0];

    if (onlyPositives(arr)) return sum(arr, 0, arr.length);

    let max = -Infinity;

    for (let i = 0; i < arr.length; ++i) {
        for (let j = arr.length - i; j >= 1; --j) {
            const tmp = sum(arr, i, i + j);

            if (tmp > max) max = tmp;
        }
    }

    return max;
}

function onlyNegatives(arr) {
    for (const entry of arr) {
        if (entry > 0) return false;
    }

    return true;
}

function onlyPositives(arr) {
    for (const entry of arr) {
        if (entry < 0) return false;
    }

    return true;
}

function sum(arr, start, end) {
    let sum = 0;

    for (let i = start; i < end; ++i) {
        sum += arr[i];
    }

    return sum;
}
