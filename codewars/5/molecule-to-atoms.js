function parseMolecule(formula) {
    const parts = formula.match(
        /([A-Z][a-z]*\d*)|(\(.*?\)\d*)|(\[.*?\]\d*)|(\{.*?\}\d*)/g
    );

    const result = {};

    parts.forEach((str) => {
        isGroup(str)
            ? addAtoms(result, parseGroup(str))
            : addAtoms(result, parseAtom(str));
    });

    return result;
}

function parseAtom(input) {
    const [_, atom, count] = input.match(/([A-Z][a-z]*)(\d*)/);

    return { [atom]: formatCount(count) };
}

function parseGroup(str) {
    const brackets = chooseBrackets(str);
    const [_, formula, count] = str.match(
        new RegExp(`\\${brackets[0]}(.+?)\\${brackets[1]}(\\d*)`)
    );

    return multiplyAtoms(parseMolecule(formula), formatCount(count));
}

function chooseBrackets(str) {
    for (const letter of str) {
        switch (letter) {
            case '(':
                return '()';
            case '[':
                return '[]';
            case '{':
                return '{}';
        }
    }
}

function addAtoms(to, from) {
    for (const atom in from) {
        if (from.hasOwnProperty(atom)) {
            if (to.hasOwnProperty(atom)) {
                to[atom] += from[atom];
            } else {
                to[atom] = from[atom];
            }
        }
    }

    return to;
}

function multiplyAtoms(atoms, count) {
    Object.keys(atoms).map((key) => (atoms[key] *= count));

    return atoms;
}

function isGroup(str) {
    return /[\(\[\{]/.test(str);
}

function formatCount(str) {
    const result = Number(str);

    if (result) return result;

    return 1;
}
