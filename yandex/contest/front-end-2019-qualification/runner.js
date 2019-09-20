const mod1 = require('./1.js');
const mod2 = require('./2.js');
const BinaryTreeNode = require('./3.js');

let output = ``;

let xd = BinaryTreeNode.create(10, 5, 13, 7, 20, 12);

xd = xd.remove(10).inorder((data) => {
  output += data + `-`;
});

console.log(`Output ` + output);
