module.exports = function(diffs) {
  const result = [];
  let x = 0;
  let y = 0;

  for (const pair of diffs) {
    const temp = [];

    const xVal = pair[0] * (x > 0 ? -1 : 1);

    x += xVal;
    temp.push(xVal);

    const yVal = pair[1] * (y > 0 ? -1 : 1);

    y += yVal;
    temp.push(yVal);

    result.push(temp);
  }

  if (x === 0 && y === 0) {
    return result;
  }

  return null;
};
