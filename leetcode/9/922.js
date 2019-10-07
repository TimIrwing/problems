/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortArrayByParityII = function(A) {
  const local = [...A];
  let max = local.length - 1;

  while (max >= 0) {
    if (max % 2 !== local[max] % 2) {
      for (let i = 0; i < max; ++i) {
        local[i] = [local[i + 1], (local[i + 1] = local[i])][0];
      }
    } else {
      --max;
    }
  }

  return local;
};
