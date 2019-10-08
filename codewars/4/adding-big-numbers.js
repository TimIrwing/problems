function add(a, b) {
    let prefix = '';
    let result = '';

    if (a.length > b.length) {
        prefix = a.substring(0, a.length - b.length);
        a = a.substring(a.length - b.length);
    } else if (b.length > a.length) {
        prefix = b.substring(0, b.length - a.length);
        b = b.substring(b.length - a.length);
    }

    let reserved = 0;
    for (let i = a.length - 1; i >= 0; --i) {
        const digitA = Number(a[i]);
        const digitB = Number(b[i]);

        const num = digitA + digitB + reserved;

        if (num > 9) {
            reserved = Math.floor(num / 10);
            result = String(num % 10) + result;
        } else {
            reserved = 0;
            result = String(num) + result;
        }
    }

    if (reserved !== 0) prefix = add(prefix, String(reserved));

    return prefix + result;
}
