//  ----------
//    Source
//  ----------
function parseExpression(program) {
  program = skipSpace(program);
  let match;
  let expr;
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: `value`, value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: `value`, value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    expr = { type: `word`, name: match[0] };
  } else {
    throw new SyntaxError(`Unexpected syntax: ` + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != `(`) {
    return { expr: expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: `apply`, operator: expr, args: [] };
  while (program[0] != `)`) {
    const arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == `,`) {
      program = skipSpace(program.slice(1));
    } else if (program[0] != `)`) {
      throw new SyntaxError(`Expected ',' or ')'`);
    }
  }
  return parseApply(expr, program.slice(1));
}

function skipSpace(string) {
  const first = string.search(/\S/);
  if (first == -1) return ``;
  return string.slice(first);
}

function parse(program) {
  const { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError(`Unexpected text after program`);
  }
  return expr;
}
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}

const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == `value`) {
    return expr.value;
  } else if (expr.type == `word`) {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == `apply`) {
    const { operator, args } = expr;
    if (operator.type == `word` && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      const op = evaluate(operator, scope);
      if (typeof op == `function`) {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError(`Applying a non-function.`);
      }
    }
  }
}

specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError(`Wrong number of args to if`);
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError(`Wrong number of args to while`);
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (const arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != `word`) {
    throw new SyntaxError(`Incorrect use of define`);
  }
  const value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (const op of [`+`, `-`, `*`, `/`, `==`, `<`, `>`]) {
  topScope[op] = Function(`a, b`, `return a ${op} b;`);
}

topScope.print = (value) => {
  console.log(value);
  return value;
};

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError(`Functions need a body`);
  }
  const body = args[args.length - 1];
  const params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != `word`) {
      throw new SyntaxError(`Parameter names must be words`);
    }
    return expr.name;
  });

  return function() {
    if (arguments.length != params.length) {
      throw new TypeError(`Wrong number of arguments`);
    }
    const localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
};

//  -----------
//    Program
//  -----------

specialForms.set = (args, scope) => {
  if (Object.prototype.hasOwnProperty.call(scope, args[1].name)) {
    Object.getPrototypeOf(scope)[args[0].name] = scope[args[1].name];
  } else {
    throw ReferenceError(`${args[0].name} is not defined.`);
  }
};

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError
