// [rule参考]("https://www.jianshu.com/p/339bdb463964")
// [官网](https://eslint.org/docs/rules/)
// [webstorm ESLint: TypeError: this.cliEngine is not a constructor](https://blog.csdn.net/qq_20567691/article/details/101152933)
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
