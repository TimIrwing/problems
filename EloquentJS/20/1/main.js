const args = process.argv;

const groups = args[2].match(/^\/(?<regexp>.*)\/(?<flags>\w*)$/).groups;
const regexp = new RegExp(groups.regexp, groups.flags);
const paths = args.slice(3);
const result = []; // ЕБАТЬ

let { readFile, statSync, readdirSync, readFileSync } = require('fs');

for (const path of paths) {
  const stats = statSync(path);
  if (stats.isDirectory()) {
    processDirectory(path, regexp, result);
  } else if (processFile(path, regexp)) {
    result.push(path);
  }
}

if (result.length > 0) {
  console.log();
  console.log('Files matching your regular expression:');

  result.forEach((val) => console.log(`  >> ${val}`));
}

return 0;

function processDirectory(path, regexp, outputArr) {
  const content = readdirSync(path);
  const paths = [];

  content.forEach((val) => {
    if (path[path.length - 1] === '/') {
      paths.push(path + val);
    } else {
      paths.push(path + '/' + val);
    }
  });

  paths.forEach((val) => {
    if (processFile(val, regexp)) outputArr.push(val);
  });
}

function processFile(path, regexp) {
  return Boolean(readFileSync(path, 'utf8').match(regexp));
}
