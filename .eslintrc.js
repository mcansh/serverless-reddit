module.exports = {
  parser: 'pluggable-babel-eslint',
  env: {
    es6: true,
  },
  plugins: ['jsx-a11y', 'react', 'prettier', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    plugins: ['typescript'],
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
  },
};
