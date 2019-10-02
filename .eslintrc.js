module.exports = {
  extends: ['mcansh/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['prettier.config.js'] },
    ],
  },
};
