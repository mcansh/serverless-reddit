module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: ['styled-components', ['inline-react-svg', { svgo: false }]],
};
