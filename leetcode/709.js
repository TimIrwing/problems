/**
 * @param {string} str
 * @return {string}
 */
const toLowerCase = function(str) {
  let result = ``;

  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    if (code <= 90 && code >= 65) {
      result += String.fromCharCode(code + 32);
    } else {
      result += str[i];
    }
  }

  return result;
};
