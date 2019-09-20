function palindrome(str) {
  const local = str.replace(/[^a-z0-9]/gi, ``).toLowerCase();

  for (let i = 0; i < local.length / 2; ++i) {
    if (local[i] !== local[local.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(palindrome(`eeY_ ee`));
