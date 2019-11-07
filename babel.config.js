module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    // 转换以便使用 bigint
    '@babel/plugin-syntax-bigint',
    // 何时true，编译类属性以使用赋值表达式而不是Object.defineProperty。
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
