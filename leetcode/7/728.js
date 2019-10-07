/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
function selfDividingNumbers(left, right) {
  const result = [];
  for (let i = left; i <= right; ++i) {
    if (isSelfDividing(i)) {
      result.push(i);
    }
  }

  return result;
}

function isSelfDividing(num) {
  const digits = String(num).split(``);

  for (const digit of digits) {
    if (num % Number(digit) !== 0) return false;
  }

  return true;
}
