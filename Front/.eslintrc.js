module.exports = {
    
    "parser": "babel-eslint",

    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true,
        "codeFrame": true
    },

    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true,
        "node": true,
        "jquery": true
    },
    
    "extends": "eslint:recommended",
    
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },

    "plugins":["import","html"],

    "parserOptions": {
        "ecmaVersion": 2018
    },

    "rules": {
        "strict": 0
    }
}