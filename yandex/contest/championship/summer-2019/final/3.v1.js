(function() {
    const TILE_SIZE = 256;
    window.onload = function() {
        const map = document.querySelector('#map');
        const xMax = Math.ceil(
            (document.body.offsetWidth + TILE_SIZE) / (2 * TILE_SIZE)
        );
        const yMax = Math.ceil(
            (document.body.offsetHeight + TILE_SIZE) / (2 * TILE_SIZE)
        );
        const xOffset = document.body.offsetWidth / 2 - 0.5 * TILE_SIZE;
        const yOffset = document.body.offsetHeight / 2 - 0.5 * TILE_SIZE;

        const queue = [[0, 0]];
        const visited = new Map();
        let result = Promise.resolve();

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            for (const cell of getNeighbours(x, y)) {
                const str = `${cell[0]}.${cell[1]}`;

                if (inBounds(cell[0], cell[1], xMax, yMax)) {
                    if (!visited.has(str)) {
                        visited.set(str, true);
                        queue.push(cell);
                    }
                }
            }
            result = result.then(() => {
                const img = document.createElement('img');
                img.width = TILE_SIZE;
                img.height = TILE_SIZE;
                img.style.position = 'absolute';

                img.style.left = xOffset + x * TILE_SIZE;
                img.style.top = yOffset + y * TILE_SIZE;

                img.src = `http://localhost:3000/${x}.${y}`;

                const promise = new Promise((resolve) => {
                    img.addEventListener('load', () => resolve());
                });

                map.appendChild(img);
                return promise;
            });
        }

        // Когда карта полностью готова (загружены все тайлы, в том числе дополнительный "пояс"),
        // надо вызвать window.onMapReady.
        result.then(window.onMapReady);

        function getNeighbours(x, y) {
            return [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
        }

        function inBounds(x, y, xMax, yMax) {
            return x >= -xMax && x <= xMax && y >= -yMax && y <= yMax;
        }
    };
})();
