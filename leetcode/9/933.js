const RecentCounter = function() {
  this.pings = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.pings.push(t);
  let counter = 1;

  for (let i = this.pings.length - 2; i >= 0; --i, ++counter) {
    if (t - this.pings[i] > 3000) {
      break;
    }
  }

  return counter;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
