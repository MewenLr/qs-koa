module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends" : "airbnb-base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": [2, "never"],
    "no-throw-literal": 0,
    "no-return-assign": 0,
    "quotes": [2, "single"],
    "no-underscore-dangle": 0,
    "prefer-promise-reject-errors": 0,
    "no-shadow": [2, { "allow": ["err"] }],
    "import/no-unresolved": [2, { "caseSensitive": false }],
    "object-curly-newline": ["error", {
      "ObjectPattern": { "multiline": true },
      "ExportDeclaration": { "multiline": true }
    }]
  }
};