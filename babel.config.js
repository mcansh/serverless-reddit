module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: [
      'styled-components',
      'root-import',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };
};
