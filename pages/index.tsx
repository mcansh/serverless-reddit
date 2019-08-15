import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { oc } from 'ts-optchain';
import { useRouter } from 'next/router';

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

const Index: NextPage<Props> = ({ subreddit }: Props) => {
  const router = useRouter();
  const query = Array.isArray(router.query.fetch)
    ? router.query.fetch[0]
    : router.query.fetch;
  const posts = oc(subreddit).data.children([]);
  return (
    <App>
      <Header />
      <Head>
        <title>{query ? `${query} - ` : ''} Next.js: ZEIT Serverless SSR</title>
      </Head>
      <div className="main">
        <Sidebar activeSubreddit={query || ''} />
        <div className="feed">
          {posts.length ? (
            posts.map(({ data }) => <Post key={data.id} post={data} />)
          ) : (
            <div
              css={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                h1: {
                  fontSize: '2.4rem',
                  fontFamily: "'SF Mono', menlo, monospace",
                  color: 'var(--default)',
                },
              }}
            >
              <h1>Sorry &quot;{query}&quot; has no posts</h1>
            </div>
          )}
        </div>
      </div>
    </App>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  const proxy = isServer ? '' : 'https://cors-anywhere.herokuapp.com/';

  const url = query.fetch
    ? `${proxy}https://reddit.com/r/${query.fetch}.json`
    : `${proxy}https://www.reddit.com/.json`;

  const promise = await fetch(url);
  const subreddit = await promise.json();

  return { subreddit };
};

export default Index;
