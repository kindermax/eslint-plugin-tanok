'use strict';

module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    node: true,
  },
  parser: "babel-eslint",
  rules: {
    strict: 'error',
  },
};
