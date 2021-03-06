import React from 'react';
import Router, { useRouter } from 'next/router';

import { feeds } from '~/constants';

const Form = () => {
  const {
    query: { subreddit = '', sort, t: time, ...query },
  } = useRouter();

  return (
    <form
      method="GET"
      onSubmit={event => {
        event.preventDefault();
        const fetchFeed = event.currentTarget.fetchFeed.value;

        if (fetchFeed.includes('/')) {
          // eslint-disable-next-line no-alert
          return alert(
            `We don't currently support subreddits with "/" in them, if you'd like to contribute, open a PR ${process.env.REPO}`
          );
        }

        if (!fetchFeed) {
          return Router.push({ pathname: '/', query });
        }

        return Router.push(
          { pathname: '/r/[subreddit]', query },
          { pathname: `/r/${fetchFeed.toLowerCase()}`, query }
        );
      }}
    >
      <input
        name="fetchFeed"
        className="header__search"
        placeholder="Enter a Subreddit..."
        defaultValue={subreddit}
      />
      {subreddit && (
        <select
          css={`
            appearance: none;
            background: var(--background-color);
            border: 1px solid var(--background-color);
            box-sizing: border-box;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 14px;
            height: 40px;
            color: var(--default);
            outline: none;
            margin-left: 1rem;
            &:hover,
            &:focus {
              border-color: var(--search-border);
            }
          `}
          value={sort}
          onChange={event => {
            const { value } = event.target;
            Router.push(
              { pathname: '/r/[subreddit]/[sort]', query },
              { pathname: `/r/${subreddit}/${value}`, query }
            );
          }}
        >
          {feeds.map(feed => (
            <option key={feed} value={feed}>
              {feed}
            </option>
          ))}
        </select>
      )}
      {sort === 'top' && (
        <select
          css={`
            appearance: none;
            background: var(--background-color);
            border: 1px solid var(--background-color);
            box-sizing: border-box;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 14px;
            height: 40px;
            color: var(--default);
            outline: none;
            margin-left: 1rem;
            &:hover,
            &:focus {
              border-color: var(--search-border);
            }
          `}
          value={time}
          onChange={event => {
            const { value } = event.currentTarget;
            Router.push(
              {
                pathname: '/r/[subreddit]/[sort]',
                query: { ...query, t: value },
              },
              {
                pathname: `/r/${subreddit}/${sort}`,
                query: { ...query, t: value },
              }
            );
          }}
        >
          {[
            { display: 'now', value: 'hour' },
            { display: 'today', value: 'day' },
            { display: 'this week', value: 'week' },
            { display: 'this month', value: 'month' },
            { display: 'this year', value: 'year' },
            { display: 'all time', value: 'all' },
          ].map(feed => (
            <option key={feed.display} value={feed.value}>
              {feed.display}
            </option>
          ))}
        </select>
      )}
    </form>
  );
};

export { Form };
