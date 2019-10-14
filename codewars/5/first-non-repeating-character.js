function firstNonRepeatingLetter(str) {
    for (const letter of str) {
        if (isNotRepeating(str, letter)) return letter;
    }

    return '';
}

function isNotRepeating(str, char) {
    str = str.toLowerCase();
    char = char.toLowerCase();
    return str.indexOf(char) === str.lastIndexOf(char);
}
