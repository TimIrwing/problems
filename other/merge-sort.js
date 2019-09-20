function mergeSort(arr) {
  const middle = Math.floor(arr.length / 2);

  if (middle >= 1) {
    return merge(mergeSort(arr.slice(0, middle)), mergeSort(arr.slice(middle)));
  }

  return arr;
}

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  const result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
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

console.log(mergeSort([0, 4, 2, 1, 8, 3]));
