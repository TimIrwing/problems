/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function(nums) {
  const rotationPoint = findRotationPoint(nums);

  return nums[0] > nums[rotationPoint] ? nums[rotationPoint] : nums[0];
};

function findRotationPoint(arr) {
  let min = 0;
  let max = arr.length - 1;

  while (min < max) {
    const cur = Math.floor((min + max) / 2);

    if (arr[cur - 1] > arr[cur]) {
      return cur;
    } else if (arr[cur] > arr[arr.length - 1]) {
      min = cur + 1;
    } else {
      max = cur - 1;
    }
  }

  return min;
}
