export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.*)\]:\s(.*)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'style', 'chore', 'refactor', 'docs', 'design'],
    ],
  },
};
