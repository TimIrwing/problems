/**
 * @param {string[]} words
 * @return {number}
 */
const uniqueMorseRepresentations = function(words) {
  const engToMorse = [
    `.-`,
    `-...`,
    `-.-.`,
    `-..`,
    `.`,
    `..-.`,
    `--.`,
    `....`,
    `..`,
    `.---`,
    `-.-`,
    `.-..`,
    `--`,
    `-.`,
    `---`,
    `.--.`,
    `--.-`,
    `.-.`,
    `...`,
    `-`,
    `..-`,
    `...-`,
    `.--`,
    `-..-`,
    `-.--`,
    `--..`,
  ];
  const txt = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let transformations = [];

  for (const word of words) {
    const transformation = toMorse(word);

    if (~transformations.indexOf(transformation)) {
      transformations.push(transformation);
    }
  }

  return transformations.length;

  function toMorse(word) {
    let result = ``;

    for (const char of word) {
      result += engToMorse[txt.indexOf(char.toUpperCase())];
    }

    return result;
  }
};
