module.exports = {
    parserOptions: {
        parser: 'babel-eslint', //词法解析器使用babel-eslint，以更好的适配es6的新api
        ecmaVersion: 7, //启用 ES7 语法支持;默认设置为3，5（默认）， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
        sourceType: 'module', //设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
        ecmaFeatures: {
            'jsx': true,
            'experimentalObjectRestSpread': true,
        },
    },
    'plugins': [
        'react-hooks',
    ],
    'rules': {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prefer-destructuring': ['error', {
            'VariableDeclarator': {
                'array': false,
                'object': true,
            },
            'AssignmentExpression': {
                'array': true,
                'object': true,
            },
        }, {
            'enforceForRenamedProperties': false,
        }],
    },
};
