/**
 * @param {number[]} nums
 * @return {number[]}
 */
let decompressRLElist = function(nums) {
    const result = [];

    for (let i = 1; i < nums.length; i += 2) {
        result.push(...new Array(nums[i - 1]).fill(nums[i]));
    }

    return result;
};
