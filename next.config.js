const path = require('path');

const withSourcemaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');

const pkgJSON = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

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
  target: 'experimental-serverless-trace',
  env: {
    SENTRY_DSN: 'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474',
    VERSION: pkgJSON.version,
    DESCRIPTION: pkgJSON.description,
    REPO: `https://github.com/${pkgJSON.repository}`,
    API_BASE: 'https://www.reddit.com',
    FATHOM_SITE_ID: 'UKNZVXBD',
    BASE_URL: 'https://reddit.loganmcansh.com',
  },
  experimental: {
    modern: true,
    rewrites: () => [
      { source: '/manifest.json', destination: '/api/manifest' },
      { source: '/manifest.webmanifest', destination: '/api/manifest' },
      {
        source: '/sw.js',
        destination: isProduction ? '/_next/static/sw.js' : '/dummy-sw.js',
      },
    ],
    headers: () =>
      [
        {
          source: '/(manifest.json|manifest.webmanifest)',
          headers: [
            { key: 'Content-Type', value: 'application/manifest+json' },
            isProduction && {
              key: 'Cache-Control',
              value: 'public, max-age=43200, immutable',
            },
          ].filter(Boolean),
        },
        {
          source: '/logos/:path*',
          headers: [
            isProduction && {
              key: 'Cache-Control',
              value: 's-maxage=31536000, maxage=0',
            },
          ].filter(Boolean),
        },
        isProduction && {
          source: '/static/:path*',
          headers: [
            { key: 'Cache-Control', value: 's-maxage=31536000, maxage=0' },
          ],
        },
        {
          source: '/sw.js',
          headers: [
            { key: 'Cache-Control', value: 'max-age=0' },
            { key: 'Service-Worker-Allowed', value: '/' },
          ],
        },
      ].filter(Boolean),
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
          `reddit@${pkgJSON.version}_${buildId}`
        ),
      })
    );

    return config;
  },
};

module.exports = withOffline(withSourcemaps(nextConfig));
