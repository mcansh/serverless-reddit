// @flow
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import type { Post as PostType } from '../types/Post';

type Props = {
  subreddit: {
    data: {
      children: {
        data: PostType,
      }[],
    },
  },
  query: {
    fetch: string,
  },
};

const Index = ({ subreddit, query }: Props) => (
  <div
    className="App"
    css={`
      text-align: center;
      display: grid;
      grid-template-rows: 80px calc(100% - 80px);
      height: 100vh;
    `}
  >
    <Header />
    <div
      className="main"
      css={`
        height: calc(100vh - 80px); /* 80 for header, 25 for padding */
        padding: 25px;
        padding-left: max(25px, env(safe-area-inset-left));
        padding-right: max(25px, env(safe-area-inset-left));
        margin: 80px 0;
        width: 100vw;

        @media (min-width: 1024px) {
          display: grid;
          grid-template-columns: 280px calc(100vw - 355px);
          grid-gap: 25px;
        }
      `}
    >
      <Sidebar activeSubreddit={query.fetch} />
      <div className="feed">
        {subreddit &&
          subreddit.data &&
          subreddit.data.children &&
          subreddit.data.children.length !== 0 &&
          subreddit.data.children.map(({ data }) => (
            <Post key={data.id} post={data} />
          ))}
      </div>
    </div>
  </div>
);

Index.getInitialProps = async ({ query }) => {
  const isServer = typeof window === 'undefined';
  const proxy = isServer ? '' : 'https://cors-anywhere.herokuapp.com/';

  const url = query.fetch
    ? `${proxy}https://reddit.com/r/${query.fetch}.json`
    : `${proxy}https://www.reddit.com/.json`;

  const promise = await fetch(url);
  const subreddit = await promise.json();

  return {
    subreddit,
    query: {
      ...query,
      fetch: query.fetch || '',
    },
  };
};

export default Index;
