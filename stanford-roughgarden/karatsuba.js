function karatsuba(num1, num2) {
    if (num1 < 10 && num2 < 10) return num1 * num2;

    let str1 = num1.toString();
    let str2 = num2.toString();

    while (str1.length !== str2.length || !isPowerOfTwo(str1.length)) {
        if (str1.length < str2.length) {
            str1 = '0' + str1;
        } else {
            str2 = '0' + str2;
        }
    }

    const len = Math.floor(str1.length / 2);

    const a = Number(str1.slice(0, len));
    const b = Number(str1.slice(len));
    const c = Number(str2.slice(0, len));
    const d = Number(str2.slice(len));

    const ac = karatsuba(a, c);
    const bd = karatsuba(b, d);

    const n = str1.length;
    // 10^n * ac + 10^(n/2) * adbc + bd
    return (
        10 ** n * ac + 10 ** (n / 2) * (karatsuba(a + b, c + d) - ac - bd) + bd
    );
}

function isPowerOfTwo(num) {
    while (num >= 2) {
        num /= 2;
    }

    return num === 1;
}
