import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { subscriptions, favorites } from '../utils/subredditList';
import Home from './icons/home.svg';
import Popular from './icons/popular.svg';
import All from './icons/all.svg';
import OriginalContent from './icons/original_content.svg';
import Account from './icons/account.svg';
import Messages from './icons/messages.svg';
import SidebarSubreddit from './SidebarSubreddit';
import StyledLink from './Link';

const Aside = styled.aside.attrs({ className: 'section' })`
  display: none;
  position: sticky;
  width: 280px;
  top: 105px;
  left: 25px;
  background-color: white;
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
    color: #999999;
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
    fill: #000;
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
    color: #000000;
  }

  .section__list-item:not(:last-child) {
    margin-bottom: 17px;
  }

  .section__list-item:last-child {
    margin-bottom: 28px;
  }
`;

type Props = { activeSubreddit: string };

const Sidebar = ({ activeSubreddit }: Props) => (
  <Aside>
    <h6 className="section__heading">Reddit Feeds</h6>
    <ul className="section__list">
      <li className="section__list-item">
        <Home
          className={`section__list-item-icon ${
            activeSubreddit === '' ? ' active' : ''
            }`}
        />
        <Link href="?" as="/" passHref prefetch>
          <StyledLink>Home</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <Popular />
        <Link href="?fetch=popular" as="/r/popular" passHref prefetch>
          <StyledLink>Popular</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <All />
        <Link href="?fetch=all" as="/r/all" passHref prefetch>
          <StyledLink>All</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <OriginalContent />
        <Link
          href="?fetch=originalcontent"
          as="/r/originalcontent"
          passHref
          prefetch
        >
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
        <Account />
        <Link href="?fetch=myaccount" as="/r/myaccount" passHref prefetch>
          <StyledLink>My Account</StyledLink>
        </Link>
      </li>
      <li className="section__list-item">
        <Messages />
        <Link href="?fetch=messages" as="/r/messages" passHref prefetch>
          <StyledLink>Messages</StyledLink>
        </Link>
      </li>
    </ul>
  </Aside>
);

export default Sidebar;
