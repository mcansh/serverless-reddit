const path = require('path');

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
    SENTRY_DSN: 'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474',
    VERSION: pkgJSON.version,
    DESCRIPTION: pkgJSON.description,
    REPO: `https://github.com/${pkgJSON.repository}`,
    API_BASE: 'https://www.reddit.com',
  },
  experimental: {
    modern: true,
    pages404: true,
    polyfillsOptimization: true,
  },
  webpack: (config, { isServer, buildId, webpack }) => {
    config.resolve.alias['~'] = path.resolve('./');

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

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
        'process.env.SENTRY_RELEASE': JSON.stringify(
          `reddit@${pkgJSON.VERSION}_${buildId}`
        ),
      })
    );

    return config;
  },
};

module.exports = withOffline(withSourcemaps(nextConfig));
