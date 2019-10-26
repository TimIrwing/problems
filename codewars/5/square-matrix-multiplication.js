function matrixMultiplication(a, b) {
    const res = [];

    for (let i = 0; i < a.length; ++i) {
        const row = [];

        for (let j = 0; j < a[i].length; ++j) {
            row.push(multiplyRowByCol(a, i, b, j));
        }

        res.push(row);
    }

    return res;
}

function multiplyRowByCol(matrixA, rowA, matrixB, colB) {
    let res = 0;

    matrixA[rowA].forEach((valA, i) => {
        res += valA * matrixB[i][colB];
    });

    return res;
}
