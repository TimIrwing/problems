/**
 * @param {number[]} nums
 * @return {number[]}
 */
let smallerNumbersThanCurrent = function(nums) {
    return nums.map((val) => {
        return nums.reduce((acc, cur) => {
            if (val > cur) ++acc;
            return acc;
        }, 0);
    });
};
