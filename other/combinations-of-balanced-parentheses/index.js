const OPEN = '(';
const CLOSE = ')';

function braceSequences(n) {
    if (n === 1) return [OPEN + CLOSE];

    const result = [];

    for (let i = 1; i < n; ++i) {
        const combined = combineSequences(
            braceSequences(i),
            braceSequences(n - i)
        );

        for (const entry of combined) {
            if (!result.includes(entry)) result.push(entry);
        }
    }

    for (const entry of braceSequences(n - 1)) {
        result.push(OPEN + entry + CLOSE);
    }

    return result;
}

function combineSequences(arr1, arr2) {
    const result = [];

    for (const entry1 of arr1) {
        for (const entry2 of arr2) {
            result.push(entry1 + entry2);
        }
    }

    return result;
}

const arr = braceSequences(3);

for (const entry of arr) {
    console.log(entry);
}
