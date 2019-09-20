/**
 * @param {Array.<number[]>} matrix
 * @return {Array.<number[]>}
 */
const flipAndInvertImage = function(matrix) {
  const local = [];

  for (const row of matrix) {
    local.push(invertArr(reverseArr(row)));
  }

  return local;
};

function reverseArr(arr) {
  const local = [];

  for (let i = arr.length - 1; i >= 0; --i) {
    local.push(arr[i]);
  }

  return local;
}

function invertArr(arr) {
  const local = [];

  for (const entry of arr) {
    local.push(1 ^ entry);
  }

  return local;
}
