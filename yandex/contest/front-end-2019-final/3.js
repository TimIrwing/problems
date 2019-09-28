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
        const xOffset = document.body.offsetWidth / 2 - TILE_SIZE / 2;
        const yOffset = document.body.offsetHeight / 2 - TILE_SIZE / 2;
        let result = Promise.resolve();
        const cells = [];

        for (let y = -yMax; y <= yMax; ++y) {
            for (let x = -xMax; x <= xMax; ++x) {
                cells.push([[x, y], distanceToCenter(x, y)]);
            }
        }

        cells.sort((a, b) => a[1] - b[1]);

        for (const [[x, y]] of cells) {
            result = result.then(() => {
                const img = document.createElement('img');
                img.width = TILE_SIZE;
                img.height = TILE_SIZE;
                img.style.position = 'absolute';
                img.style.left = TILE_SIZE * x + xOffset;
                img.style.top = TILE_SIZE * y + yOffset;
                img.src = `http://localhost:3000/${x}.${y}`;

                const promise = new Promise((resolve) =>
                    img.addEventListener('load', () => resolve(img))
                );

                map.appendChild(img);
                return promise;
            });
        }

        // Когда карта полностью готова (загружены все тайлы, в том числе дополнительный "пояс"),
        // надо вызвать window.onMapReady.
        result.then(window.onMapReady);

        function distanceToCenter(x, y) {
            return Math.sqrt(x ** 2 + y ** 2);
        }
    };
})();
