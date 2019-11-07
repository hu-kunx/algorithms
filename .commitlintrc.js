module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style','improvement', 'refactor', 'chore', 'publish'],
    ],
    'subject-case': [0, 'never'],
  },
};
