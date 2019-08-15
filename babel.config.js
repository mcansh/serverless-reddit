module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: ['styled-components', 'root-import', 'ts-optchain'],
  };
};
