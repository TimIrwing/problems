/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = function(x, y) {
  let minBin = Math.min(x, y).toString(2);
  const maxBin = Math.max(x, y).toString(2);

  while (minBin.length < maxBin.length) {
    minBin = `0` + minBin;
  }

  let count = 0;

  for (let i = 0; i < minBin.length; ++i) {
    if (minBin[i] !== maxBin[i]) ++count;
  }

  return count;
};
