const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION // ℹ️ Must be `NOW_REGION`, not `NOW` (my bad)
      ? require('next/constants')
      : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const withTypescript = require('@zeit/next-typescript');

  return withTypescript()
};
