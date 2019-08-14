module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: [
      'styled-components',
      'root-import',
      ['inline-react-svg', { svgo: false }],
      'ts-optchain',
    ],
  };
};
