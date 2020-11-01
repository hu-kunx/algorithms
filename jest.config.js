module.exports = {
  transform: {
    // '^.+\\.tsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testRegex: './test/.*.test.ts$',
  moduleFileExtensions: ['ts', 'js'],
};
