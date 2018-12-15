module.exports = {
  parser: "eslint-plugin-typescript/parser",
  plugins: ["typescript"],
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
