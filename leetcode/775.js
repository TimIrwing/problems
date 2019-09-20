/**
 * @param {number[]} A
 * @return {boolean}
 */
function isIdealPermutation(arr) {
    const tmp = sortAndCount(arr);
    console.log(tmp);

    return tmp[1] === tmp[2];
}

function sortAndCount(arr) {
    const length = arr.length;
    if (length === 1) return [arr, 0, 0];

    const center = Math.floor(length / 2);

    const left = sortAndCount(arr.slice(0, center));
    const right = sortAndCount(arr.slice(center));
    const split = mergeAndCountSplitInv(left[0], right[0]);

    return [
        split[0],
        left[1] + right[1] + split[1],
        left[2] + right[2] + split[2],
    ];
}

function mergeAndCountSplitInv(arr1, arr2) {
    let countGlobal = 0;
    let countLocal = 0;
    const merged = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            ++i;
        } else {
            merged.push(arr2[j]);
            ++j;
            countGlobal += arr1.length - i;
            if (j === 0) ++countLocal;
        }
    }

    while (i < arr1.length) {
        merged.push(arr1[i]);
        ++i;
        if (j === 0) ++countLocal;
    }

    while (j < arr2.length) {
        merged.push(arr2[j]);
        ++j;
    }

    return [merged, countGlobal, countLocal];
}

// function isIdealPermutation(A) {
//     let globalInv = 0;
//     let localInv = 0;

//     countInversion(A);

//     return globalInv === localInv;

//     function countInversion(sequence) {
//         if (sequence.length <= 1) return;

//         const center = Math.floor(sequence.length / 2);

//         countInversion(sequence.slice(0, center));
//         countInversion(sequence.slice(center));

//         for (let i = 0; i < center; ++i) {
//             for (let j = center; j < sequence.length; ++j) {
//                 if (sequence[i] > sequence[j]) {
//                     ++globalInv;
//                     if (j - i === 1) ++localInv;
//                 }
//             }
//         }

//         return;
//     }
// }
// function isIdealPermutation(A) {
//     const inversions = countInversion(A);

//     return inversions[0] === inversions[1];
// }

// function countInversion(sequence) {
//     if (sequence.length <= 1) return [0, 0];

//     const center = Math.floor(sequence.length / 2);
//     let globalInv = 0;
//     let localInv = 0;

//     const left = countInversion(sequence.slice(0, center));
//     const right = countInversion(sequence.slice(center));

//     globalInv += left[0] + right[0];
//     localInv += left[1] + right[1];

//     for (let i = 0; i < center; ++i) {
//         for (let j = center; j < sequence.length; ++j) {
//             if (sequence[i] > sequence[j]) {
//                 ++globalInv;
//                 if (j - i === 1) ++localInv;
//             }
//         }
//     }

//     return [globalInv, localInv];
// }
