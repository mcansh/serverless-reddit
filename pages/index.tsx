import React from 'react';
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { Post as PostType } from '../types/Post';

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

const App = styled.div.attrs({ className: 'App' })`
  text-align: center;
  height: 100%;

  .main {
    padding: 25px;
    margin-top: 80px;
    width: 100vw;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 280px 1fr;
      grid-gap: 25px;
    }
  }
`

const Index = ({ subreddit, query }: Props) => (
  <App>
    <Header />
    <div className="main">
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
  </App >
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
