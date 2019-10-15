function alphanumeric(string) {
    if (!string.length) return false;

    for (const letter of string) {
        if (/[^A-Za-z0-9]/.test(letter)) return false;
    }

    return true;
}
