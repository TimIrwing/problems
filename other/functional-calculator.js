function getNumberFunc(num = 0) {
    return function(func) {
        if (func) {
            return func(num);
        }
        return num;
    };
}

function plus(num) {
    return function(arg1, arg2) {
        return arg2 + arg1;
    }.bind(null, num);
}

function minus(num) {
    return function(arg1, arg2) {
        return arg2 - arg1;
    }.bind(null, num);
}

function times(num) {
    return function(arg1, arg2) {
        return arg2 * arg1;
    }.bind(null, num);
}

function over(num) {
    return function(arg1, arg2) {
        return arg2 / arg1;
    }.bind(null, num);
}

const one = getNumberFunc(1);
const three = getNumberFunc(3);
const five = getNumberFunc(5);
const nine = getNumberFunc(9);

console.log(five(plus(one())));
console.log(nine(times(three(minus(one())))));
console.log(three(over(three())));
