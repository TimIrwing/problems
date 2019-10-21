function longestRepetition(s) {
    let count = 0;
    let prev = '';
    let maxCount = 0;
    let maxChar = '';

    s.split('').forEach((char) => {
        if (prev === char) {
            ++count;
        } else {
            count = 1;
        }

        prev = char;
        if (count > maxCount) {
            maxCount = count;
            maxChar = char;
        }
    });

    return [maxChar, maxCount];
}
