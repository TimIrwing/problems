/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersection(nums1, nums2) {
  const result = [];

  for (const entry of nums1) {
    if (!~result.indexOf(entry)) {
      if (~nums2.indexOf(entry)) {
        result.push(entry);
      }
    }
  }

  return result;
}
