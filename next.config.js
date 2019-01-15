const withTypescript = require('@zeit/next-typescript');

const config = {
  crossOrigin: 'anonymous',
  target: 'serverless',
};

module.exports = withTypescript(config);
