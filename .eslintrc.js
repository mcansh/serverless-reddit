module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    '@typescript-eslint/camelcase': [
      'error',
      {
        allow: ['unstable_getServerProps', 'Unstable_getServerProps'],
        properties: 'never',
      },
    ],
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
