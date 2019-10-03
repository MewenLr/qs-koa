module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends" : ["airbnb-base"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": ["error", "never"],
    "no-throw-literal": "off",
    "no-return-assign": "off",
    "quotes": ["error", "single"],
    "no-underscore-dangle": "off",
    "prefer-promise-reject-errors": "off",
    "no-shadow": ["error", { "allow": ["err"] }],
    "import/no-unresolved": ["error", { "caseSensitive": false }],
    "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
    "object-curly-newline": ["error", {
      "ObjectPattern": { "multiline": true },
      "ExportDeclaration": { "multiline": true }
    }]
  }
};