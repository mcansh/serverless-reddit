const webpack = require('webpack');
const withSourcemaps = require('@zeit/next-source-maps')();
const pkgJSON = require('./package.json');

const nextConfig = {
  crossOrigin: 'anonymous',
  target: 'serverless',
  env: {
    SENTRY: 'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474',
    VERSION: pkgJSON.version,
    DESCRIPTION: pkgJSON.description,
  },
  webpack: (config, { buildId }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );

    return config;
  },
};

module.exports = withSourcemaps(nextConfig);
