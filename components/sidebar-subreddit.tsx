import * as React from 'react';
import Link from 'next/link';

import StyledLink from './link';

interface Props {
  subreddit: string;
}

const SidebarSubreddit = ({ subreddit }: Props) => (
  <li className="section__list-item">
    <picture>
      <source
        srcSet={`/static/img/subreddits/${subreddit}.webp`}
        type="image/webp"
      />
      <source
        srcSet={`/static/img/subreddits/${subreddit}.png`}
        type="image/png"
      />
      <img
        className="section__list-item-icon section__list-item-icon_image"
        alt={subreddit}
        src={`/static/img/subreddits/${subreddit}.png`}
      />
    </picture>
    <Link href={`?fetch=${subreddit}`} as={`/r/${subreddit}`} prefetch passHref>
      <StyledLink>/r/{subreddit}</StyledLink>
    </Link>
  </li>
);

export default SidebarSubreddit;
