import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { getBaseURL } from '@mcansh/next-now-base-url';

import { getFirstParams } from '~/utils/get-first-param';
import Sidebar from '~/components/sidebar';
import Post from '~/components/post';
import { Post as PostType } from '~/@types/Post';
import Header from '~/components/header';

const config = {
  amp: 'hybrid',
};

interface Props {
  subreddit?: string;
  sort?: string;
  data?: {
    message?: string;
    data?: {
      before: string | null;
      after: string | null;
      dist: number;
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

    @supports (padding: env(safe-area-inset-bottom)) and (padding: max(0px)) {
      padding: 25px 25px max(25px, env(safe-area-inset-bottom)) 25px;
    }

    @media (display-mode: standalone) {
      margin-top: calc(env(safe-area-inset-top) + 80px);
    }

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 280px 1fr;
      grid-gap: 25px;
    }
  }

  .feed {
    overflow: hidden;
  }
`;

const Index: NextPage<Props> = ({ data, subreddit }) => {
  const posts = data?.data?.children ?? [];

  return (
    <App>
      <Header />
      <Head>
        <title>{subreddit ? `${subreddit} -` : ''} Serverless Reddit</title>
      </Head>
      <div className="main">
        <Sidebar activeSubreddit={subreddit || ''} />
        {posts.length ? (
          <div className="feed">
            {posts.map(post => (
              <Post key={post.data.id} post={post.data} />
            ))}
          </div>
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
            <h1>
              {data?.message || `Sorry "${subreddit}" has no posts`}
            </h1>
          </div>
        )}
      </div>
    </App>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  const { subreddit, sort } = getFirstParams(query);
  const baseURL = getBaseURL(req);

  const url =
    subreddit && sort
      ? `api/r/${subreddit}/${sort}`
      : subreddit
      ? `api/r/${subreddit}`
      : 'api/r';

  const promise = await fetch(`${baseURL}/${url}`);

  return {
    data: await promise.json(),
    sort,
    subreddit,
  };
};

export default Index;
export { config };
