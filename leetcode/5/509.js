// /**
//  * @param {number} N
//  * @return {number}
//  */
// const fib = function(N) {
//   let prev = 1;
//   let cur = 1;

//   if (N > 2) {
//     for (i = 3; i <= N; ++i) {
//       prev = [cur, (cur += prev)][0];
//     }

//     return cur;
//   }

//   return [0, 1, 1][N];
// };

/**
 * @param {number} N
 * @return {number}
 */
const fib = function(N) {
  if (N < 2) {
    return N;
  }

  return fib(N - 1) + fib(N - 2);
};
