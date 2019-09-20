function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let pending = promises.length;

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          results[i] = val;
          --pending;
          if (pending === 0) resolve(results);
        })
        .catch(reject);
    }

    if (promises.length === 0) resolve(results);
  });
}

// Test code.
promiseAll([]).then((array) => {
  console.log(`This should be []:`, array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
promiseAll([soon(1), soon(2), soon(3)]).then((array) => {
  console.log(`This should be [1, 2, 3]:`, array);
});
promiseAll([soon(1), Promise.reject(Error(`X`)), soon(3)])
  .then((array) => {
    console.log(`We should not get here`);
  })
  .catch((error) => {
    if (error != `X`) {
      console.log(`Unexpected failure:`, error);
    }
  });
