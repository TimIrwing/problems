function anagrams(word, words) {
    const result = [];

    for (const entry of words) {
        if (isAnagram(word, entry)) result.push(entry);
    }

    return result;
}

function isAnagram(first, second) {
    if (first.length !== second.length) return false;

    return first.split('').sort().join('') === second.split('').sort().join('');
}
