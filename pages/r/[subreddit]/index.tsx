import { GetStaticPaths } from 'next';

export { default } from '~/pages/index';
export * from '~/pages/index';

export const getStaticPaths: GetStaticPaths = () =>
  new Promise(resolve => resolve({ paths: [], fallback: true }));
