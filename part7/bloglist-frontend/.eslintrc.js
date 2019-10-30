module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "no-unused-vars": ["off"],
    "no-undef": ["off"],
    "no-case-declarations": ["off"]
  }
};
