module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          '@types/jest-dom.d.ts',
          'next.config.js',
          'prettier.config.js',
          'stylelint.config.js',
        ],
      },
    ],
  },
};
