import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import styled from 'styled-components';

import Sidebar from '~/components/sidebar';
import Post from '~/components/post';
import { Subreddit, SubredditAbout } from '~/@types/Post';
import Header from '~/components/header';
import { SubredditAboutProvider } from '~/components/subreddit-context';

const config = {
  amp: 'hybrid',
};

interface Props {
  subreddit?: string;
  sort?: string;
  about?: SubredditAbout;
  data?: Subreddit & { message?: string };
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

const Index: NextPage<Props> = ({ data, subreddit, about }) => {
  const posts = data?.data?.children ?? [];

  return (
    <App>
      <SubredditAboutProvider value={about}>
        <Header />
        <div className="main">
          <Sidebar activeSubreddit={subreddit ?? ''} />
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
      </SubredditAboutProvider>
    </App>
  );
};

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { default: fetch } = await import('isomorphic-unfetch');
  const { getFirstParams } = await import('~/utils/get-first-param');
  const { format } = await import('url');

  const { subreddit, sort = 'hot' } = getFirstParams(query);

  const pathname = format({
    protocol: 'https',
    host: 'reddit.com',
    pathname: subreddit ? `r/${subreddit}/${sort}.json` : '.json',
  });

  const promises = [fetch(pathname).then(r => r.json())];

  if (subreddit) {
    const aboutPathname = format({
      protocol: 'https',
      host: 'reddit.com',
      pathname: `r/${subreddit}/about.json`,
    });
    promises.push(fetch(aboutPathname).then(r => r.json()));
  }

  const [subredditData, subredditAboutData] = await Promise.all(promises);

  return {
    props: {
      data: subredditData,
      sort,
      subreddit,
      about: subredditAboutData,
    },
  };
};

export default Index;
export { config, getServerSideProps };
