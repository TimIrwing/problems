function numericals(s) {
    let result = '';
    const map = new Map();

    s.split('').forEach((char) => {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }

        result += String(map.get(char));
    });

    return result;
}
