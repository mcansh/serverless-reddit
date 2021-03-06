import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import clsx from 'clsx';

import StyledLink from './link';
import SidebarSubreddit from './sidebar-subreddit';

import { favorites, subscriptions } from '~/utils/subreddit-list';
import Account from '~/public/static/img/icons/account.svg';
import All from '~/public/static/img/icons/all.svg';
import Home from '~/public/static/img/icons/home.svg';
import Messages from '~/public/static/img/icons/messages.svg';
import OriginalContent from '~/public/static/img/icons/original_content.svg';
import Popular from '~/public/static/img/icons/popular.svg';

const Aside = styled.aside.attrs({ className: 'section' })`
  display: none;
  position: sticky;
  width: 280px;
  top: 105px;
  left: 25px;
  background-color: var(--reverse-default);
  padding: 18px;
  height: calc(100vh - 80px - 50px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 1024px) {
    display: block;
  }

  .section__heading {
    margin: 0 0 16px;
    line-height: normal;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: normal;
    text-align: left;
    color: var(--sidebar-color);
  }

  .section__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: left;
  }

  .section__list-item-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    width: 20px;
    height: 20px;
    fill: var(--default);
  }

  .section__list-item-icon_compact {
    margin-right: 3px;
  }

  .section__list-item-icon.active {
    fill: rgb(255, 69, 0);
  }

  .section__list-item-icon_image {
    border-radius: 50%;
  }

  .section__list-item {
    line-height: normal;
    font-size: 14px;
    color: var(--default);

    &:not(:last-child) {
      margin-bottom: 17px;
    }

    &:last-child {
      margin-bottom: 28px;
    }
  }
`;

interface Props {
  activeSubreddit: string;
}

const Sidebar = ({ activeSubreddit }: Props) => (
  <Aside>
    <h6 className="section__heading">Reddit Feeds</h6>
    <ul className="section__list">
      <li className="section__list-item">
        <Home
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === '',
          })}
        />
        <Link href="/" as="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <Popular
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === 'popular',
          })}
        />
        <Link href="/r/[subreddit]" as="/r/popular" passHref>
          <StyledLink>Popular</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <All
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === 'all',
          })}
        />
        <Link href="/r/[subreddit]" as="/r/all" passHref>
          <StyledLink>All</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <OriginalContent
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === 'originalcontent',
          })}
        />
        <Link href="/r/[subreddit]" as="/r/originalcontent" passHref>
          <StyledLink>Original Content</StyledLink>
        </Link>
      </li>
    </ul>
    <h6 className="section__heading">Favorites</h6>
    <ul className="section__list">
      {favorites.map(subreddit => (
        <SidebarSubreddit key={`${subreddit}-favorite`} subreddit={subreddit} />
      ))}
    </ul>
    <h6 className="section__heading">Subscriptions</h6>
    <ul className="section__list">
      {subscriptions.map(subreddit => (
        <SidebarSubreddit
          key={`${subreddit}-subscription`}
          subreddit={subreddit}
        />
      ))}
    </ul>
    <h6 className="section__heading">Other</h6>
    <ul className="section__list">
      <li className="section__list-item">
        <Account
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === 'myaccount',
          })}
        />
        <Link href="/r/[subreddit]" as="/r/myaccount" passHref>
          <StyledLink>My Account</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <Messages
          className={clsx('section__list-item-icon', {
            active: activeSubreddit === 'messages',
          })}
        />
        <Link href="/r/[subreddit]" as="/r/messages" passHref>
          <StyledLink>Messages</StyledLink>
        </Link>
      </li>
    </ul>
  </Aside>
);

export default Sidebar;
