module.exports = {
  presets: ['next/babel', '@babel/flow'],
  plugins: ['styled-components', ['inline-react-svg', { svgo: false }]],
};
