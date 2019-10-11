module.exports = {
  extends: ['mcansh/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['prettier.config.js', 'next.config.js'] },
    ],
  },
};
