import React from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';

import { invert } from 'polished';
import Karma from '~/static/img/icons/karma.svg';

const HeaderStyles = styled.header.attrs({ className: 'header' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.zIndexHeader};
  border-bottom: 1px solid #eaeaea;
  top: 0;
  left: 0;
  padding: 0 2rem;
  @media (prefers-color-scheme: dark) {
    background: black;
    border-bottom-color: ${invert('#eaeaea')};
  }

  .header__logo-container {
    width: 100px;
    position: relative;
    height: 36px;

    .header__logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 100%;
      height: auto;
    }
  }

  .header__search-container {
    display: none;
  }

  .header__search {
    -webkit-appearance: none;
    appearance: none;
    background: #fafafa;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 14px;
    font-size: 14px;
    min-width: 400px;
    height: 40px;
    color: black;
    outline: none;

    @media (prefers-color-scheme: dark) {
      background: ${invert('#fafafa')};
      border-color: ${invert('#eaeaea')};
    }

    &:hover,
    &:focus {
      border-color: #d0d0d0;
      @media (prefers-color-scheme: dark) {
        border-color: ${invert('#d0d0d0')};
      }
    }
  }

  .header__user-area {
    margin-left: auto;
    display: flex;
    align-items: center;
    text-align: left;
    line-height: 15px;
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
  const { fetch } = useRouter().query;
  return (
    <HeaderStyles>
      <div className="header__logo-container">
        <picture>
          <source
            srcSet="/static/img/reddit.webp"
            media="(prefers-color-scheme: light)"
            type="image/webp"
          />
          <source
            srcSet="/static/img/reddit.png"
            media="(prefers-color-scheme: light)"
            type="image/png"
          />
          <source
            srcSet="/static/img/reddit-light.webp"
            media="(prefers-color-scheme: dark)"
            type="image/webp"
          />
          <source
            srcSet="/static/img/reddit-light.png"
            media="(prefers-color-scheme: dark)"
            type="image/png"
          />
          <img
            className="header__logo"
            alt="Logo"
            src="/static/img/reddit.png"
            importance="low"
          />
        </picture>
      </div>
      <div className="header__search-container">
        <form
          method="POST"
          onSubmit={event => {
            event.preventDefault();
            const { value } = event.currentTarget.fetch;
            if (!value) {
              Router.push('/');
            } else {
              Router.push(`/r/[fetch]`, `/r/${value}`);
            }
          }}
        >
          <input
            name="fetch"
            className="header__search"
            placeholder="Enter a Subreddit..."
            defaultValue={fetch}
          />
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
        <div className="header__avatar-container">
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
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
