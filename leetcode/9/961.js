// /**
//  * @param {number[]} A
//  * @return {number}
//  */
// const repeatedNTimes = function(A) {
//   const localArr = [...A];
//   localArr.sort((a, b) => a - b);
//   let prev = localArr[0];

//   for (let i = 1; i < localArr.length; ++i) {
//     if (localArr[i] === prev) return localArr[i];
//     prev = localArr[i];
//   }
// };

/**
 * @param {number[]} A
 * @return {number}
 */
const repeatedNTimes = function(A) {
  const obj = {};

  for (entry of A) {
    if (obj[entry]) {
      return entry;
    } else {
      obj[entry] = 1;
    }
  }
};
