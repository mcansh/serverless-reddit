module.exports = {
  ...require('eslint-config-mcansh/prettier.config'),
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'babel-ts',
      },
    },
  ],
};
