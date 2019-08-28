module.exports = {
  extends: ['mcansh/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['prettier.config.js'] },
    ],
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
  },
};
