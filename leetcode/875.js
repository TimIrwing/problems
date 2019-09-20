/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
function minEatingSpeed(piles, H) {
  let min = Math.ceil(piles.reduce((acc, el) => (acc += el), 0) / H);
  let max = 1000000000;

  while (min <= max) {
    const cur = Math.floor((min + max) / 2);
    const curHours = testEatingSpeed(piles, cur);

    if (curHours <= H) {
      max = cur - 1;
    } else {
      min = cur + 1;
    }
  }

  return min;
}

function testEatingSpeed(piles, eatingSpeed) {
  let hours = 0;

  for (const entry of piles) {
    hours += Math.ceil(entry / eatingSpeed);
  }

  return hours;
}
