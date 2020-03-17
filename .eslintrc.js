module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "no-console": "off",
    "max-len": "error",
    "no-unused-vars": "off",
    "linebreak-style": "off",
    "no-underscore-dangle": "off",
    "no-useless-escape": "off",
    "consistent-return": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off"
  },
};
