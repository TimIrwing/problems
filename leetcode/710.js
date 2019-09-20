/**
 * @param {number} N
 * @param {number[]} blacklist
 */
const Solution = function(N, blacklist) {
  this.upperLimit = N;
  this.blacklist = [...blacklist];
  this.blacklist.sort((a, b) => a - b);
  this.usingWhitelist = false;

  if (blacklist.length >= N / 2) {
    this.usingWhitelist = true;
    this.whitelist = [];

    for (let i = 0; i < N; ++i) {
      if (!arrContains(i, this.blacklist)) {
        this.whitelist.push(i);
      }
    }
  }
};

/**
 * @return {number}
 */
Solution.prototype.pick = function() {
  if (this.usingWhitelist) {
    return this.whitelist[Math.floor(Math.random() * this.whitelist.length)];
  } else {
    while (true) {
      const i = Math.floor(Math.random() * this.upperLimit);

      if (!arrContains(i, this.blacklist)) {
        return i;
      }
    }
  }
};

function arrContains(num, arr) {
  let min = 0;
  let max = arr.length - 1;

  while (min < max) {
    const cur = Math.floor((min + max) / 2);

    if (arr[cur] === num) {
      return true;
    } else if (arr[cur] < num) {
      min = cur + 1;
    } else {
      max = cur - 1;
    }
  }

  return arr[min] === num;
}
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(N, blacklist)
 * var param_1 = obj.pick()
 */
