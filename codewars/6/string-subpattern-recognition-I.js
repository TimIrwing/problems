function hasSubpattern(str) {
    for (let i = 1; i <= str.length / 2; ++i) {
        const subStr = str.slice(0, i);

        if (isPattern(str, subStr)) return true;
    }

    return false;
}

function isPattern(str, part) {
    for (let j = part.length; j < str.length; j += part.length) {
        if (part !== str.slice(j, j + part.length)) return false;
    }

    return true;
}
