/**
 * @param {string} S
 * @return {string}
 */
const removeOuterParentheses = function(S) {
  let result = ``;
  let closedBrCount = 0;
  let previousIndex = 0;

  for (let i = 0; i < S.length; ++i) {
    const letter = S[i];

    if (letter === `(`) {
      ++closedBrCount;
    } else if (closedBrCount !== 1) {
      --closedBrCount;
    } else {
      --closedBrCount;
      result += S.slice(previousIndex + 1, i);
      previousIndex = i + 1;
    }
  }

  return result;
};

removeOuterParentheses(`(()())(())`);
