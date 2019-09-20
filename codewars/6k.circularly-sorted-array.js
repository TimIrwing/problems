function isCircleSorted(arr) {
    if (arr.length < 2) return true;

    const minIndex = findMinIndex(arr);

    if (minIndex === 0) return isSorted(arr);

    const lesserPart = arr.slice(minIndex);
    const biggerPart = arr.slice(0, minIndex);

    return (
        isSorted(lesserPart) &&
        isSorted(biggerPart) &&
        lesserPart[lesserPart.length - 1] <= biggerPart[0]
    );
}

function isSorted(arr) {
    if (arr.length > 1) {
        for (let i = 0; i < arr.length - 1; ++i) {
            if (arr[i] > arr[i + 1]) return false;
        }
    }

    return true;
}

function findMinIndex(arr) {
    const min = Math.min(...arr);
    const first = arr.indexOf(min);
    const last = arr.lastIndexOf(min);

    return last - first === 1 ? first : last;
}
