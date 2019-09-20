function rot13(str) {
  const alphabet = `abcdefghijklmnopqrstuvwxyz`.toUpperCase();
  let result = ``;

  for (const char of str) {
    if (char.match(/[A-Z]/)) {
      let index = alphabet.indexOf(char) - 13;

      if (index < 0) {
        index += alphabet.length;
      }

      result += alphabet[index];
    } else {
      result += char;
    }
  }

  return result;
}

console.log(rot13(`SERR CVMMN!`));
