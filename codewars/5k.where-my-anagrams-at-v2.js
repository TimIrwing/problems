function anagrams(word, words) {
    const result = [];

    for (const entry of words) {
        if (isAnagram(word, entry)) result.push(entry);
    }

    return result;
}

function isAnagram(first, second) {
    if (first.length !== second.length) return false;

    const firstLetters = letters(first);
    const secondLetters = letters(second);

    for (const letter in firstLetters) {
        if (
            firstLetters.hasOwnProperty(letter) &&
            secondLetters.hasOwnProperty(letter)
        ) {
            if (firstLetters[letter] !== secondLetters[letter]) return false;
        } else {
            return false;
        }
    }

    return true;
}

function letters(word) {
    const letters = {};

    for (const letter of word) {
        if (letters.hasOwnProperty(letter)) {
            ++letters[letter];
        } else {
            letters[letter] = 1;
        }
    }

    return letters;
}
