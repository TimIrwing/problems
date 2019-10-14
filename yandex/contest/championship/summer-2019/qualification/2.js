module.exports = function(promises) {
  const convert = (promise) =>
    promise.then(
      (val) => ({ status: 'resolved', value: val }),
      (reason) => ({ status: 'rejected', reason: reason })
    );

  return Promise.all(promises.map(convert)).then((results) => results);
};
