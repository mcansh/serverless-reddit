// @flow
/*
 * A static list of subreddits I want to show. In order to
 * - show static asset deployment on Now,
 * - not convolute the benchmarks with extra requests,
 *
 * these map to images in `/img` by filename. Adding something here
 * that doesn't exist in `/img` will lead to broken images in our
 * demo.
 */
const subscriptions = [
  'announcements',
  'argentina',
  'art',
  'aww',
  'books',
  'creepy',
  'funny',
  'futbol',
  'gaming',
  'javascript',
  'puns',
];

const favorites: string[] = subscriptions.slice(0, 4);

export { subscriptions, favorites };
