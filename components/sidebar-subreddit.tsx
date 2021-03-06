import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <Image
        className="section__list-item-icon section__list-item-icon_image"
        alt={subreddit}
        src={`/static/img/subreddits/${subreddit}.png`}
        importance="low"
        height={20}
        width={20}
        // style={{ display: 'inline-block' }}
      />
    </picture>
    <Link href="/r/[subreddit]" as={`/r/${subreddit}`} passHref>
      <StyledLink>/r/{subreddit}</StyledLink>
    </Link>
  </li>
);

export default SidebarSubreddit;
