/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
const numJewelsInStones = function(J, S) {
  let result = 0;

  for (const letter of S) {
    if (~J.indexOf(letter)) ++result;
  }

  return result;
};
