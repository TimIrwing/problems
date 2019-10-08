function parseMolecule(formula) {
    const result = {};
    const parts = formula.match(
        /([A-Z][a-z]*\d*)|(\(.*?\)\d*)|(\[.*?\]\d*)|(\{.*?\}\d*)/g
    );

    for (const str of parts) {
        if (isGroup(str)) {
            addAtoms(result, parseGroup(str));
        } else {
            addAtoms(result, parseAtoms(str));
        }
    }

    return result;
}

function parseAtoms(input) {
    const atoms = input.match(/([A-Z][a-z]*)(\d*)/g);
    const result = {};

    for (const str of atoms) {
        const [_, atom, count] = str.match(/([A-Z][a-z]*)(\d*)/);

        result[atom] = formatCount(count);
    }

    return result;
}

function parseGroup(str) {
    const brackets = chooseBrackets(str);
    const [_, formula, count] = str.match(
        new RegExp(`\\${brackets[0]}(.+?)\\${brackets[1]}(\\d*)`)
    );

    return multiplyAtoms(parseMolecule(formula), formatCount(count));
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
    for (const atom in atoms) {
        if (atoms.hasOwnProperty(atom)) {
            atoms[atom] *= count;
        }
    }

    return atoms;
}

function isGroup(str) {
    return Boolean(str.match(/[\(\[\{]/));
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

function formatCount(str) {
    const result = Number(str);

    if (result === 0 || isNaN(result)) return 1;

    return result;
}
