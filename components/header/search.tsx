import React from 'react';
import Router, { useRouter } from 'next/router';
import { useAmp } from 'next/amp';
import { RequireExactlyOne } from 'type-fest';
import Head from 'next/head';

import { feeds } from '~/constants';

function AmpWrap({
  ampOnly,
  nonAmp,
}: RequireExactlyOne<{ ampOnly: any; nonAmp: any }>) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

const Form = () => {
  const {
    query: { subreddit, sort, t: time, ...query },
  } = useRouter();

  return (
    <>
      <AmpWrap
        ampOnly={
          <>
            <Head>
              <script
                async
                key="amp-form"
                custom-element="amp-form"
                src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
              />
            </Head>
            <form>
              <input
                name="fetchFeed"
                className="header__search"
                placeholder="Enter a Subreddit..."
                defaultValue={subreddit}
              />
              <input type="hidden" value="1" name="amp" />
            </form>
          </>
        }
      />
      <AmpWrap
        nonAmp={
          <form
            method="GET"
            onSubmit={event => {
              event.preventDefault();
              const fetchFeed = event.currentTarget.fetchFeed.value;
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
        }
      />
    </>
  );
};

export { Form };
