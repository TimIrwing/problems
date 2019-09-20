function findShort(s) {
    return s.split(' ').reduce((acc, val) => {
        const len = val.length;

        if (len < acc) acc = len;

        return acc;
    }, Infinity);
}
