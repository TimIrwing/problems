const PIN_LENGTH = 4;

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = function(deadends, target) {
    const pin = '0000';

    return makeTurn(pin, target, deadends);
};

function makeTurn(pin, target, deadends) {
    if (pin === target) return 0;
    if (deadends.includes(pin)) return -1;

    const directions = makeDirection(target, pin);

    for (let i = 0; i < PIN_LENGTH; ++i) {
        const direction = directions[i];

        if (direction === 0) continue;

        const tmpPin = changeDigit(pin, i, direction);

        const val = makeTurn(tmpPin, target, deadends);

        if (val !== -1) return val + 1;
    }

    // ! eto kostil' predstav' chto etogo net xd
    while (true) {
        const rand = Math.floor(Math.random() * PIN_LENGTH);
        const direction = Math.random() < 0.5 ? 1 : -1;

        const tmpPin = changeDigit(pin, rand, direction);

        const val = makeTurn(tmpPin, target, deadends);

        if (val !== -1) return val + 1;
    }
}

function makeDirection(target, pin) {
    const directions = [];

    target.split('').forEach((char, index) => {
        const val = Number(pin[index]) - Number(char);

        if ((val < 0 && val > -6 && val !== 0) || val > 5) {
            directions[index] = 1;
        } else if (val !== 0) {
            directions[index] = -1;
        } else {
            directions[index] = 0;
        }
    });

    return directions;
}

function changeDigit(str, index, additive) {
    const tmp = str.split('');
    tmp[index] = String(formatDigit(Number(str[index]) + additive));
    return tmp.join('');
}

function formatDigit(digit) {
    if (digit < 0) return 10 + digit;

    return digit % 10;
}
