import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import { useMedia } from 'react-use';

import Sidebar from '~/components/sidebar';
import Post from '~/components/post';
import { Subreddit, SubredditAbout } from '~/@types/Post';
import Header from '~/components/header';
import { SubredditAboutProvider } from '~/components/subreddit-context';
import Meta from '~/components/meta';
import { getFirstParams } from '~/utils/get-first-param';

export const getStaticProps: GetStaticProps<Props> = async ({
  params = {},
}) => {
  const { subreddit, sort = 'hot' } = getFirstParams(params);

  const pathname = subreddit ? `/r/${subreddit}/${sort}.json` : '/.json';

  const promises = [fetch(process.env.API_BASE + pathname).then(r => r.json())];

  if (subreddit) {
    const aboutPathname = `/r/${subreddit}/about.json`;
    promises.push(
      fetch(process.env.API_BASE + aboutPathname).then(r => r.json())
    );
  }

  const [subredditData, subredditAboutData] = await Promise.all(promises);

  return {
    unstable_revalidate: 60 * 60, // 1 hour
    props: {
      data: subredditData,
      sort,
      subreddit: subreddit ?? '',
      about: subredditAboutData ?? {},
    },
  };
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

const ErrorOrLoading: React.FC = ({ children }) => (
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
    <h1>{children}</h1>
  </div>
);

const Index: NextPage<Props> = ({ data, subreddit, about }) => {
  const posts = data?.data?.children ?? [];

  const { isFallback } = useRouter();

  const showSideBar = useMedia('(min-width: 1024px)', false);

  return (
    <App>
      <SubredditAboutProvider value={about}>
        <Meta />
        <Header />
        <div className="main">
          {showSideBar && <Sidebar activeSubreddit={subreddit ?? ''} />}
          {isFallback ? (
            <ErrorOrLoading>Loading...</ErrorOrLoading>
          ) : posts.length ? (
            <div className="feed">
              {posts.map(post => (
                <Post key={post.data.id} post={post.data} />
              ))}
            </div>
          ) : (
            <ErrorOrLoading>
              {data?.message ?? `Sorry "${subreddit}" has no posts`}
            </ErrorOrLoading>
          )}
        </div>
      </SubredditAboutProvider>
    </App>
  );
};

export default Index;
