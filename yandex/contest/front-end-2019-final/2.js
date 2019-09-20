module.exports = function(servers, check) {
  // return new Promise((res, rej) => {
  //   let min = 0;
  //   let max = servers.length - 1;
  //   let middle;

  //   while (min < max) {
  //     middle = Math.floor((max + min) / 2);

  //     check(servers[middle]).then((val) => {
  //       if (val) {
  //         min = middle + 1;
  //       } else {
  //         max = middle - 1;
  //       }
  //     });
  //   }

  //   res(servers[min]);
  // });
  return Promise.all(servers.map(convert)).catch((val) => val);

  function convert(server) {
    return new Promise((resolve, reject) => {
      check(server).then((val) => {
        if (!val) {
          reject(server);
        }
      });
    });
  }
};
