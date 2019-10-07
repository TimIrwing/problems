/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = function(cpdomains) {
  const processed = cpdomains.map((val) => {
    const str = val.split(` `);
    return [Number(str[0]), str[1].split(`.`)];
  });

  const obj = {};
  const result = [];

  for (const match of processed) {
    const num = Number(match[0]);
    const str = match[1];

    for (let i = 0; i < str.length; ++i) {
      const temp = str.slice(i).join(`.`);

      if (obj.hasOwnProperty(temp)) {
        obj[temp] += num;
      } else {
        obj[temp] = num;
      }
    }
  }

  for (const [key, val] of Object.entries(obj)) {
    result.push(`${val} ${key}`);
  }

  return result;
};
