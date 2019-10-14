module.exports = function(servers, check) {
    let min = 0;
    let max = servers.length - 1;

    return binsearch(Math.floor(servers.length / 2));

    function binsearch(mid) {
        if (min >= max) {
            return check(servers[min]).then((val) => {
                if (val) {
                    return servers[min + 1];
                }
                return servers[min];
            });
        }

        return check(servers[mid])
            .then((val) => {
                if (val) {
                    min = mid + 1;
                } else {
                    max = mid - 1;
                }
            })
            .then(() => binsearch(Math.floor((min + max) / 2)));
    }
};
