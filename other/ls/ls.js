const symbols = {
    indent: '   ',
    indentLine: '━━━',
    child: '┣',
    lastChild: '┗',
    verticalLine: '┃',
    empty: ' ',
};

const { resolve } = require('path');
const { statSync, readdirSync } = require('fs');

const path = resolve(process.cwd(), process.argv[2]);
const noFiles = process.argv[3] === '-nf';

if (!statSync(path).isDirectory()) {
    throw new Error('Target is not a directory');
}

deepFriedLs(path, '', noFiles);

function deepFriedLs(path, prefix, noFiles) {
    let content = readdirSync(path, { withFileTypes: true });

    if (noFiles) {
        content = content.filter((val) => val.isDirectory());
    }

    let suffix = symbols.verticalLine + symbols.indent;
    let additive = symbols.child;

    content.forEach((entry, index) => {
        if (index === content.length - 1) {
            suffix = symbols.empty + symbols.indent;
            additive = symbols.lastChild;
        }

        const newPath = resolve(path, entry.name);

        const print = prefix + additive + symbols.indentLine + ' ' + entry.name;

        if (entry.isFile()) {
            console.log(print + ` (${statSync(newPath).size}B)`);
        } else {
            console.log(print);
            deepFriedLs(newPath, prefix + suffix, noFiles);
        }
    });
}
