decodeMorse = function(morseCode) {
    const words = morseCode.split(/\s{3,}/);

    return words.map(decodeWord).join(' ').trim();
};

function decodeWord(word) {
    const letters = word.split(/\s{1,}/);

    return letters.map(decodeSymbol).join('').trim();
}

function decodeSymbol(code) {
    return MORSE_CODE[code];
}
