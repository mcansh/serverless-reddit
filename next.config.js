const withSourcemaps = require('@zeit/next-source-maps')();
const pkgJSON = require('./package.json');

const config = {
  crossOrigin: 'anonymous',
  target: 'serverless',
  env: {
    SENTRY: 'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474',
    VERSION: pkgJSON.version,
    DESCRIPTION: pkgJSON.description,
  },
};

module.exports = withSourcemaps(config);
