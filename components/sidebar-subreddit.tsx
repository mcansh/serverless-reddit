import React from 'react';
import Link from 'next/link';
import { useAmp } from 'next/amp';

import StyledLink from './link';

interface Props {
  subreddit: string;
}

const SidebarSubreddit = ({ subreddit }: Props) => {
  const isAmp = useAmp();
  return (
    <li className="section__list-item">
      {isAmp ? (
        <amp-img
          className="section__list-item-icon section__list-item-icon_image"
          alt={subreddit}
          src={`/static/img/subreddits/${subreddit}.webp`}
          layout="responsive"
          height={20}
          width={20}
        >
          <amp-img
            className="section__list-item-icon section__list-item-icon_image"
            alt={subreddit}
            src={`/static/img/subreddits/${subreddit}.png`}
            fallback
            layout="responsive"
            height={20}
            width={20}
          />
        </amp-img>
      ) : (
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
            importance="low"
          />
        </picture>
      )}
      <Link href="/r/[subreddit]" as={`/r/${subreddit}`} passHref>
        <StyledLink>/r/{subreddit}</StyledLink>
      </Link>
    </li>
  );
};

export default SidebarSubreddit;
