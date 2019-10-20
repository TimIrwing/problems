function rle(str) {
    if (/[^a-zA-Z]/.test(str)) throw new Error('Invalid string');

    let result = str[0];

    for (const current of str.slice(1)) {
        const [_, letter, count] = result.match(/([a-zA-Z])(\d*)$/);

        if (current === letter) {
            if (count === '') {
                result += '2';
            } else {
                result = result.replace(/\d+$/, Number(count) + 1);
            }
        } else {
            result += current;
        }
    }

    return result;
}
