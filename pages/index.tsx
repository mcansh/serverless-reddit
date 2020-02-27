import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';

import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';

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
      before: string | undefined;
      after: string | undefined;
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
            <h1>{data?.message ?? `Sorry "${subreddit}" has no posts`}</h1>
          </div>
        )}
      </div>
    </App>
  );
};

// this will eventually be exported by next.js, but for the meantime
// https://github.com/zeit/next.js/pull/10077/files#diff-7506e9167e048e7a6b9582935826610cR37-R42
type Unstable_getServerProps = (context: {
  params: ParsedUrlQuery | undefined;
  req: IncomingMessage;
  res: ServerResponse;
  query: ParsedUrlQuery;
}) => Promise<{ [key: string]: any }>;

const unstable_getServerProps: Unstable_getServerProps = async ({
  query,
  req,
}) => {
  const { default: fetch } = await import('isomorphic-unfetch');
  const { getBaseURL } = await import('@mcansh/next-now-base-url');
  const { getFirstParams } = await import('~/utils/get-first-param');

  const { subreddit, sort } = getFirstParams(query);

  const baseURL = getBaseURL(req);

  const pathname =
    subreddit && sort
      ? `api/r/${subreddit}/${sort}`
      : subreddit
      ? `api/r/${subreddit}`
      : 'api/r';

  const url = `${baseURL}/${pathname}`;

  const promise = await fetch(url);

  return {
    props: {
      data: await promise.json(),
      sort,
      subreddit,
    },
  };
};

export default Index;
export { config, unstable_getServerProps };
