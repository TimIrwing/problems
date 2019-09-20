/**
 * @param {string} moves
 * @return {boolean}
 */
const judgeCircle = function(moves) {
  let xCount = 0;
  let yCount = 0;

  for (const val of moves) {
    switch (val) {
      case `U`:
        ++xCount;
        break;
      case `D`:
        --xCount;
        break;
      case `R`:
        ++yCount;
        break;
      case `L`:
        --yCount;
        break;
    }
  }

  return xCount === 0 && yCount === 0;
};
