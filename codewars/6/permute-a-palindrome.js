function permuteAPalindrome(input) {
    const map = Object.create(null);

    input.split('').forEach((char) => {
        if (map[char]) {
            ++map[char];
        } else {
            map[char] = 1;
        }
    });

    if (input.length % 2 === 0) {
        return allEven(map);
    }

    return onlyOneOdd(map);
}

function allEven(obj) {
    return !Object.keys(obj).some((key) => obj[key] % 2 !== 0);
}

function onlyOneOdd(obj) {
    let count = 0;

    Object.keys(obj).forEach((key) => {
        if (obj[key] % 2 === 1) ++count;
    });

    return count === 1;
}
