import type { GetStaticPaths } from 'next';

export { default } from '~/pages/index';
export * from '~/pages/index';

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: true });
