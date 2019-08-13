import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

import Sidebar from '~/components/sidebar';
import Post from '~/components/post';
import { Post as PostType } from '~/@types/Post';
import Header from '~/components/header';

interface Props {
  subreddit: {
    data: {
      children: {
        data: PostType;
      }[];
    };
  };
  query: {
    fetch: string;
  };
}

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
`;

const Index: NextPage<Props> = ({ subreddit, query }: Props) => (
  <App>
    <Header />
    <Head>
      <title>
        {query.fetch ? `${query.fetch} - ` : ''} Next.js: ZEIT Serverless SSR
      </title>
    </Head>
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
  </App>
);

Index.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  const proxy = isServer ? '' : 'https://cors-anywhere.herokuapp.com/';

  const url = query.fetch
    ? `${proxy}https://reddit.com/r/${query.fetch}.json`
    : `${proxy}https://www.reddit.com/.json`;

  const promise = await fetch(url);
  const subreddit = await promise.json();

  return {
    subreddit,
    query: {
      fetch: Array.isArray(query.fetch) ? query.fetch[0] : query.fetch || '',
    },
  };
};

export default Index;
