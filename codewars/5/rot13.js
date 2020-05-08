function rot13(str) {
    return str.split('').map(convertChar).join('');
}

function convertChar(char) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const isUpperCase = char === char.toUpperCase();
    char = char.toLowerCase();

    if (!alphabet.includes(char)) return char;

    const newChar = alphabet[(alphabet.indexOf(char) + 13) % alphabet.length];

    return isUpperCase ? newChar.toUpperCase() : newChar;
}
