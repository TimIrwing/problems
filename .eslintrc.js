module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: 'google',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    rules: {
        'quote-props': [`error`, 'as-needed'],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        indent: [
            'error',
            4,
            {
                VariableDeclarator: 'first',
                MemberExpression: 1,
                ArrayExpression: 1,
                SwitchCase: 1,
            },
        ],
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true,
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration: true,
                    Property: true,
                },
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        'require-jsdoc': 'off',
        'max-len': [
            'error',
            {
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreUrls: true,
                tabWidth: 4,
            },
        ],
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: true,
                ignoreComments: true,
            },
        ],
        'no-extend-native': ['error', { exceptions: ['Array'] }],
    },
};
