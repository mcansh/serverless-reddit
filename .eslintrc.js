module.exports = {
  extends: ['mcansh'],
  plugins: ['typescript'],
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: 'typescript-eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
