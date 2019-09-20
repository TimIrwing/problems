const time = {
  start: Date.now(),
  end: 0,
};

function compareRobots(cycles, robot1, memory1, robot2, memory2) {
  let robot1Count = 0;
  let robot2Count = 0;

  for (let i = 1; i <= cycles; ++i) {
    console.log(`\nCycle number ${i}:`);
    const state = VillageState.random();

    robot1Count += runRobot(state, robot1, memory1);
    robot2Count += runRobot(state, robot2, memory2);
  }

  const robot1Avg = (robot1Count / cycles).toFixed(2);
  const robot2Avg = (robot2Count / cycles).toFixed(2);

  console.log(
    `\n${robot1.name} average is ${robot1Avg} turns\n${robot2.name} average is ${robot2Avg} turns\n`
  );

  if (robot1Avg < robot2Avg) {
    return `${robot1.name} is faster by ${((robot2Avg - robot1Avg) /
      (robot2Avg / 100)).toFixed(2)}%`;
  }
  if (robot1Avg > robot2Avg) {
    return `${robot2.name} is faster by ${((robot1Avg - robot2Avg) /
      (robot1Avg / 100)).toFixed(2)}%`;
  }
  return `Robots have finished in the same moment`;
}

//   ---------
//    Source
//   ---------
const roads = [
  `Alice's House-Bob's House`,
  `Alice's House-Cabin`,
  `Alice's House-Post Office`,
  `Bob's House-Town Hall`,
  `Daria's House-Ernie's House`,
  `Daria's House-Town Hall`,
  `Ernie's House-Grete's House`,
  `Grete's House-Farm`,
  `Grete's House-Shop`,
  `Marketplace-Farm`,
  `Marketplace-Post Office`,
  `Marketplace-Shop`,
  `Marketplace-Town Hall`,
  `Shop-Town Hall`,
];

function buildGraph(edges) {
  const graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (const [from, to] of edges.map((r) => r.split(`-`))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

const VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      const parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
};

VillageState.random = function(parcelCount = 5) {
  const parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    const address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState(`Post Office`, parcels);
};

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`  ${robot.name} moved to ${action.direction}`);
  }
}

function randomPick(array) {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

const mailRoute = [
  `Alice's House`,
  `Cabin`,
  `Alice's House`,
  `Bob's House`,
  `Town Hall`,
  `Daria's House`,
  `Ernie's House`,
  `Grete's House`,
  `Shop`,
  `Grete's House`,
  `Farm`,
  `Marketplace`,
  `Post Office`,
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  const work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    const { at, route } = work[i];
    for (const place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    const parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function myOwnRobot({ place, parcels }, route) {
  if (route.length == 0) {
    const acquire = [];
    for (let i = 0; i < parcels.length; ++i) {
      const parcel = parcels[i];

      if (parcel.place != place) {
        acquire.push(parcel);
      }
    }

    if (acquire.length !== 0) {
      parcels = acquire;
    }

    for (let i = 0; i < parcels.length; ++i) {
      const parcel = parcels[i];

      let temp;

      if (parcel.place == place) {
        temp = findRoute(roadGraph, place, parcel.address);
      } else {
        temp = findRoute(roadGraph, place, parcel.place);
      }

      if (route.length == 0 || temp.length < route.length) route = temp;
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

console.log(compareRobots(10, myOwnRobot, [], goalOrientedRobot, []));

time.end = Date.now();
console.log(
  `\nProgram runtime: ` + ((time.end - time.start) / 1000).toFixed(3) + `s`
);
