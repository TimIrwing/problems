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

        const visited = new Map();
        let result = Promise.resolve();

        for (let r = 0; r <= 1 + Math.max(xMax, yMax) * 2; ++r) {
            const points = getCirclePoints(r);

            for (const [x, y] of points) {
                const str = `${x}.${y}`;

                if (inBounds(x, y, xMax, yMax)) {
                    if (!visited.has(str)) {
                        visited.set(str, true);

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
                }
            }
        }

        // Когда карта полностью готова (загружены все тайлы, в том числе дополнительный "пояс"),
        // надо вызвать window.onMapReady.
        result.then(window.onMapReady);

        function getCirclePoints(r) {
            const radiusSquared = r ** 2;
            const points = [];
            let x;

            for (let y = 0; y <= Math.sqrt(r ** 2 / 2); y += 0.5) {
                if (y === 0) {
                    x = r;
                } else {
                    x = Math.floor(Math.sqrt(Math.abs(radiusSquared - y ** 2)));
                }

                const wholeY = Math.round(y);

                points.push([x, wholeY]);

                if (x !== wholeY) {
                    points.push([wholeY, x]);
                }

                if (wholeY !== 0) {
                    points.push([x, -wholeY]);
                    points.push([-wholeY, x]);
                }
                if (x !== 0) {
                    points.push([-x, wholeY]);
                    points.push([wholeY, -x]);
                }

                if (x !== 0 && wholeY !== 0) {
                    points.push([-x, -wholeY]);
                    points.push([-wholeY, -x]);
                }
            }

            return points;
        }

        function inBounds(x, y, xMax, yMax) {
            return x >= -xMax && x <= xMax && y >= -yMax && y <= yMax;
        }
    };
})();
