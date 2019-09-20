/**
 * @param {number[]} nums
 * @return {number}
 */
const arrayPairSum = function(nums) {
  const local = nums.sort((a, b) => a - b);
  let sum = 0;

  for (let i = 0; i < local.length; i += 2) {
    sum += local[i];
  }

  return sum;
};

arrayPairSum([0, 1]);
