/**
 * @param {number} n
 * @return {number}
 */
let subtractProductAndSum = function(n) {
    const digits = Array.from(n.toString()).map((val) => Number(val));

    const product = digits.reduce((acc, val) => acc * val);
    const sum = digits.reduce((acc, val) => acc + val);

    return product - sum;
};
