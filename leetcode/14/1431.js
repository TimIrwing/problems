/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
let kidsWithCandies = function(candies, extraCandies) {
    const max = Math.max(...candies);
    return candies.map((val) => max <= val + extraCandies);
};
