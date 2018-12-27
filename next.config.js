const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

const config = {
  crossOrigin: 'anonymous',
};

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return config;
  }

  const withTypescript = require('@zeit/next-typescript');

  return withTypescript(config);
};
