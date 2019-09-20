function checkCashRegister(price, cash, cid) {
  const cashInDrawer = new Map(cid);
  const currency = new Map([
    [`ONE HUNDRED`, 100],
    [`TWENTY`, 20],
    [`TEN`, 10],
    [`FIVE`, 5],
    [`ONE`, 1],
    [`QUARTER`, 0.25],
    [`DIME`, 0.1],
    [`NICKEL`, 0.05],
    [`PENNY`, 0.01],
  ]);

  let difference = cash - price;
  const change = [];

  for (const [key, val] of currency) {
    if (val > difference) {
      continue;
    }

    if (cashInDrawer.get(key) >= val) {
      const intQuotient = Math.min(
        Math.floor(cashInDrawer.get(key) / val),
        Math.floor(difference / val)
      );
      const worth = val * intQuotient;
      change.push([key, worth]);
      difference = parseFloat((difference - worth).toFixed(2));
      cashInDrawer.set(key, cashInDrawer.get(key) - worth);
    } else {
      continue;
    }

    if (difference === 0) {
      break;
    }
  }

  if (difference > 0) {
    return {
      status: `INSUFFICIENT_FUNDS`,
      change: [],
    };
  }

  for (const [_, val] of cashInDrawer) {
    if (val > 0) {
      return {
        status: `OPEN`,
        change: change,
      };
    }
  }

  return {
    status: `CLOSED`,
    change: cid,
  };
}
