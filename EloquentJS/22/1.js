function findPathv1(start, end) {
    const paths = [[start]];

    for (const path of paths) {
        const last = path[path.length - 1];

        if (last === end) return path;

        for (const neighbor of last.edges) {
            if (!paths.some((val) => val[val.length - 1] === neighbor)) {
                paths.push(path.concat([neighbor]));
            }
        }
    }
}

function findPathv2(start, end) {
    const paths = [[start]];
    const visited = new Set();

    visited.add(start);

    for (const path of paths) {
        const last = path[path.length - 1];

        if (last === end) return path;

        for (const neighbor of last.edges) {
            if (!visited.has(neighbor)) {
                paths.push(path.concat([neighbor]));
                visited.add(neighbor);
            }
        }
    }
}

const graph = treeGraph(9, 3);
const root = graph[0];

const leaf = graph[graph.length - 1];

let startTime = Date.now();
console.log(findPathv2(root, leaf).length);
// → 8  v1 - 1500ms
console.log(`It took ${Date.now() - startTime}ms to find the path`);

leaf.connect(root);

startTime = Date.now();
console.log(findPathv2(root, leaf).length);
// → 2
console.log(`It took ${Date.now() - startTime}ms to find the path`);
