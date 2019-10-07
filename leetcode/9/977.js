// /**
//  * @param {number[]} arr
//  * @return {number[]}
//  */
// const sortedSquares = function(arr) {
//   const result = [];

//   for (const entry of arr) {
//     result.push(Math.pow(entry, 2));
//   }

//   return result.sort((a, b) => a - b);
// };

// /**
//  * @param {number[]} arr
//  * @return {number[]}
//  */
// const sortedSquares = function(arr) {
//   const result = [];

//   for (let i = 0, j = arr.length - 1; i <= j; ) {
//     if (Math.abs(arr[i]) > arr[j]) {
//       result.unshift(Math.pow(arr[i++], 2));
//     } else {
//       result.unshift(Math.pow(arr[j--], 2));
//     }
//   }

//   return result;
// };

/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortedSquares = function(arr) {
  const middle = binSearchMiddlePoint(arr);
  const [lesserZero, greaterEqualsZero] = fromMiddlePoint(arr, middle);

  return merge(
    lesserZero.map((entry) => Math.pow(entry, 2)),
    greaterEqualsZero.map((entry) => Math.pow(entry, 2))
  );
};

function binSearchMiddlePoint(arr) {
  if (arr[0] >= 0) return 0;

  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const center = Math.floor((min + max) / 2);

    if (arr[center] >= 0 && arr[center - 1] < 0) {
      return center;
    } else if (arr[center] <= arr[center + 1] && arr[center] >= 0) {
      max = center - 1;
    } else {
      min = center + 1;
    }
  }

  return Math.floor((min + max) / 2);
}

function fromMiddlePoint(arr, mPoint) {
  const leftSide = [];
  const rightSide = [];

  for (i = mPoint; i < arr.length; ++i) {
    rightSide.push(arr[i]);
  }
  for (i = mPoint - 1; i >= 0; --i) {
    leftSide.push(arr[i]);
  }

  return [leftSide, rightSide];
}

// function merge(arr1, arr2) {
//   const result = [];
//   let i = 0;
//   let j = 0;

//   while (i < arr1.length || j < arr2.length) {
//     while (i < arr1.length) {
//       if (arr1[i] <= arr2[j] || j >= arr2.length) {
//         result.push(arr1[i]);
//         ++i;
//       } else {
//         break;
//       }
//     }

//     while (j < arr2.length) {
//       if (arr1[i] >= arr2[j] || i >= arr1.length) {
//         result.push(arr2[j]);
//         ++j;
//       } else {
//         break;
//       }
//     }
//   }

//   return result;
// }

function merge(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      ++i;
    } else {
      result.push(arr2[j]);
      ++j;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    ++i;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    ++j;
  }

  return result;
}
