module.exports = {
  transform: {
    // '^.+\\.tsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testRegex: './src/.*.test.ts$',
  moduleFileExtensions: ['ts', 'js'],
};
