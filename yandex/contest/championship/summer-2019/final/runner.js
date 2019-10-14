const mod2 = require(`./2.js`);

const servers = [
  `srv-a`, // ok
  `srv-b`, // fail
  `srv-c`, // fail
  `srv-d`, // fail
];

const check = (name) =>
  new Promise((res) => setTimeout(res, 100)).then(() => name === `srv-a`);

mod2(servers, check).then((val) => console.log(val));
