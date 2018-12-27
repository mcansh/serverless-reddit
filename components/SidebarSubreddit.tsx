import * as React from 'react';
import Link from 'next/link';
import StyledLink from './Link';

interface Props {
  subreddit: string;
}

const SidebarSubreddit = ({ subreddit }: Props) => (
  <li className="section__list-item">
    <img
      className="section__list-item-icon section__list-item-icon_image"
      alt={subreddit}
      src={`/static/img/subreddits/${subreddit}.png`}
    />
    <Link href={`?fetch=${subreddit}`} as={`/r/${subreddit}`} prefetch passHref>
      <StyledLink>/r/{subreddit}</StyledLink>
    </Link>
  </li>
);

export default SidebarSubreddit;
