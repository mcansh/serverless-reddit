import React from 'react';
import Router, { useRouter } from 'next/router';
import { useAmp } from 'next/amp';
import styled from 'styled-components';
import Link from 'next/link';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { hideVisually } from 'polished';
import VisuallyHidden from '@reach/visually-hidden';

import Karma from '~/static/img/icons/karma.svg';
import Reddit from '~/static/img/reddit.svg';
import { feeds } from '~/constants';

const HeaderStyles = styled.header.attrs({ className: 'header' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: var(--reverse-default);
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.zIndexHeader};
  border-bottom: 1px solid var(--background-color);
  top: 0;
  left: 0;
  padding: 0 2rem;

  @media (display-mode: standalone) {
    height: calc(env(safe-area-inset-top) + 80px);
    padding-top: env(safe-area-inset-top);
  }

  .header__logo-container {
    max-width: 100px;
    height: auto;
    display: block;
    text-decoration: none;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  .header__search-container {
    display: none;
  }

  .header__search {
    appearance: none;
    background: var(--background-color);
    border: 1px solid var(--background-color);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 14px;
    font-size: 14px;
    min-width: 400px;
    height: 40px;
    color: var(--default);
    outline: none;

    &:hover,
    &:focus {
      border-color: var(--search-border);
    }
  }

  .header__user-area {
    display: flex;
    align-items: center;
    text-align: left;
    line-height: 15px;
  }

  .header__username {
    color: var(--default);
  }

  .header__karma-container {
    display: flex;
    align-items: center;
  }

  .header__karma-thing {
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .header__karma-thing path {
    fill: #ff4500;
  }

  .header__karma-counter {
    line-height: normal;
    font-size: 12px;
    color: #999999;
  }

  .header__avatar-container {
    background: none;
    border: none;
    padding: 0;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    position: relative;
  }

  .header__avatar {
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .header form {
    margin: 0;
  }

  @media (min-width: 768px) {
    .header__search-container {
      display: block;
    }

    .header__user-area {
      margin-left: initial;
    }
  }
`;

const Header = () => {
  const {
    query: { subreddit, sort, ...query },
  } = useRouter();
  const isAmp = useAmp();
  const [settingsModal, setSettingsModal] = React.useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    document.documentElement.className = event.target.value;
    document.cookie = `theme=${event.target.value}`;
    setSettingsModal(false);
  };

  return (
    <HeaderStyles>
      <Link
        href={{ pathname: '/', query: isAmp ? { ...query, amp: '1' } : query }}
      >
        <a aria-label="Reddit" className="header__logo-container">
          <Reddit
            css={{
              'g g': {
                fill: 'var(--reddit-logo-color)',
              },
            }}
          />
        </a>
      </Link>
      <div className="header__search-container">
        <form
          target={isAmp ? '_top' : undefined}
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
          {isAmp && <input type="hidden" value="1" name="amp" />}
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
        </form>
      </div>
      <div className="header__user-area">
        <div>
          <div className="header__username">evilrabbit</div>
          <div className="header__karma-container">
            <Karma />
            <div className="header__karma-counter">1 karma</div>
          </div>
        </div>
        <button
          className="header__avatar-container"
          onClick={() => setSettingsModal(true)}
          type="button"
        >
          {isAmp ? (
            <amp-img
              alt="Evil Rabbit"
              width={30}
              height={30}
              src="/static/img/evilrabbit_.webp"
              className="header__avatar"
              layout="responsive"
            >
              <amp-img
                alt="Evil Rabbit"
                width={30}
                height={30}
                src="/static/img/evilrabbit_.jpeg"
                className="header__avatar"
                fallback
                layout="responsive"
              />
            </amp-img>
          ) : (
            <picture>
              <source srcSet="/static/img/evilrabbit_.webp" type="image/webp" />
              <source srcSet="/static/img/evilrabbit_.jpeg" type="image/jpeg" />
              <img
                className="header__avatar"
                alt="Evil Rabbit"
                src="/static/img/evilrabbit_.jpeg"
                importance="low"
              />
            </picture>
          )}
        </button>
        {settingsModal && (
          <DialogOverlay
            isOpen={settingsModal}
            onDismiss={() => setSettingsModal(false)}
            css={{
              display: 'flex',
              margin: '0',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 101,
            }}
          >
            <DialogContent
              css={`
                @media (max-width: 500px) {
                  width: 80%;
                  max-width: 800px;
                }
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                h2 {
                  margin-bottom: 1rem;
                  font-size: 2rem;
                  font-weight: normal;
                }
                label {
                  margin: 0 1rem;
                  span {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.6rem;
                  }
                  span::before {
                    content: '';
                    height: 1rem;
                    width: 1rem;
                    background: none;
                    border: 1px solid black;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 0.5rem;
                  }
                  input {
                    ${hideVisually()};
                  }
                  input:checked + span::before {
                    background: black;
                  }
                }
              `}
            >
              <button
                onClick={() => setSettingsModal(false)}
                type="button"
                css={`
                  position: absolute;
                  top: 1rem;
                  right: 1rem;
                  font-size: 1.4rem;
                  border: none;
                  background: none;
                `}
              >
                <VisuallyHidden>Close</VisuallyHidden>
                <span aria-hidden>×</span>
              </button>
              <h2>Select a theme</h2>

              <div>
                <label htmlFor="system">
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    id="system"
                    onChange={handleThemeChange}
                  />

                  <span>System</span>
                </label>
                <label htmlFor="light">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    id="light"
                    onChange={handleThemeChange}
                  />
                  <span>Light</span>
                </label>
                <label htmlFor="dark">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    id="dark"
                    onChange={handleThemeChange}
                  />
                  <span>Dark</span>
                </label>
              </div>
            </DialogContent>
          </DialogOverlay>
        )}
      </div>
    </HeaderStyles>
  );
};

export default Header;
