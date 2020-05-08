/**
 * @param {number} num
 * @return {number}
 */
let numberOfSteps = function(num, steps = 0) {
    if (num === 0) return steps;

    if (num % 2 === 0) return numberOfSteps(num / 2, steps + 1);

    return numberOfSteps(num - 1, steps + 1);
};
