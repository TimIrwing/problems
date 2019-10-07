/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortArrayByParity = function(arr) {
  const even = [];
  const uneven = [];

  for (const entry of arr) {
    if (entry % 2 === 0) {
      even.push(entry);
    } else {
      uneven.push(entry);
    }
  }

  return even.concat(uneven);
};
