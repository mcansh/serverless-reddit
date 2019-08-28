const webpack = require('webpack');
const withSourcemaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');
const pkgJSON = require('./package.json');

const nextConfig = {
  // next-offline
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },

  // next config
  crossOrigin: 'anonymous',
  target: 'serverless',
  env: {
    SENTRY: 'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474',
    VERSION: pkgJSON.version,
    DESCRIPTION: pkgJSON.description,
    REPO: `https://github.com/${pkgJSON.repository}`,
  },
  experimental: {
    publicDirectory: true,
  },
  webpack: (config, { buildId }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  prefixIds: {
                    delim: '_',
                    prefixIds: true,
                    prefixClassNames: false,
                  },
                },
              ],
            },
          },
        },
      ],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );

    return config;
  },
};

module.exports = withOffline(withSourcemaps(nextConfig));
