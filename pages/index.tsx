/* eslint-disable no-nested-ternary */
import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { oc } from 'ts-optchain';
import { useRouter } from 'next/router';

import { getBaseURL } from '~/utils/get-base-url';
import { getFirstParam } from '~/utils/get-first-param';
import Sidebar from '~/components/sidebar';
import Post from '~/components/post';
import { Post as PostType } from '~/@types/Post';
import Header from '~/components/header';

const config = {
  amp: 'hybrid',
};

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

const Index: NextPage<Props> = ({ subreddit }: Props) => {
  const router = useRouter();
  const query = getFirstParam(router.query.subreddit);
  const posts = oc(subreddit).data.children([]);

  return (
    <App>
      <Header />
      <Head>
        <title>{query ? `${query} - ` : ''} Serverless Reddit</title>
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
  const { subreddit, sort } = query;
  const baseURL = getBaseURL(req);

  const url =
    subreddit && sort
      ? `api/r/${subreddit}/${sort}`
      : subreddit
      ? `api/r/${subreddit}`
      : 'api/r';

  const promise = await fetch(`${baseURL}/${url}`);

  return { subreddit: await promise.json() };
};

export default Index;
export { config };
