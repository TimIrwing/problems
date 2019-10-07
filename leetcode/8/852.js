// /**
//  * @param {number[]} A
//  * @return {number}
//  */
// const peakIndexInMountainArray = function(A) {
//   const localArr = [...A];
//   localArr.sort((a, b) => a - b);

//   return A.indexOf(localArr[localArr.length - 1]);
// };

/**
 * @param {number[]} A
 * @return {number}
 */
const peakIndexInMountainArray = function(A) {
  let min = 0;
  let max = A.length - 1;

  while (true) {
    const i = Math.floor((min + max) / 2);

    if (A[i] > A[i - 1] && A[i] > A[i + 1]) {
      return i;
    } else if (A[i] > A[i - 1]) {
      min = i + 1;
    } else {
      max = i - 1;
    }
  }
};
