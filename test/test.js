const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
});

const arr = [];

rl
  .on(`line`, (line) => {
    arr.push(line);
  })
  .on(`close`, () => {
    let prev = null;

    for (let i = 1; i < arr.length; ++i) {
      if (prev !== arr[i]) {
        prev = arr[i];
        process.stdout.write(arr[i] + `\n`);
      }
    }
  });
