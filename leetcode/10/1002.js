/**
 * @param {string[]} A
 * @return {string[]}
 */
const commonChars = function(A) {
  const dict = {};
  const result = [];

  for (const word of A) {
    for (const char of word) {
      if (dict.hasOwnProperty(char)) {
        result.push(char);
      } else {
        dict[char] = true;
      }
    }
  }

  return result;
};
