module.exports = {
  extends: ['mcansh/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
