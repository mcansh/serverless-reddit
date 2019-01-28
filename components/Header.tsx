import React, { useRef } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Karma from './icons/karma.svg';

const HeaderStyles = styled.header.attrs({ className: 'header' })`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.zIndexHeader};
  border-bottom: 1px solid #eaeaea;
  top: 0;
  left: 0;

  .header__logo-container {
    display: flex;
    align-items: center;
    max-width: 100px;
    margin-left: 20px;

    &::after {
      content: '';
      display: block;
      margin-left: 20px;
      flex: 1 0 1px;
      width: 1px;
      height: 36px;
    }

    img {
      max-width: 100px;
    }
  }

  .header__search-container {
    flex: 1 0 auto;
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

    &:hover,
    &:focus {
      border-color: #d0d0d0;
    }
  }

  .header__user-area {
    margin-left: auto;
    display: flex;
    align-items: center;
    flex: 0 1 150px;
    text-align: left;
    line-height: 15px;
    &::before {
      content: '';
      display: block;
      margin-right: 20px;
      flex: 0 0 1px;
      width: 1px;
      height: 36px;
      background-color: #eaeaea;
    }
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
  }

  .header__avatar {
    border-radius: 5px;
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
  const fetch = useRef(null);
  return (
    <HeaderStyles>
      <div className="header__logo-container">
        <picture>
          <source srcSet="/static/img/reddit.webp" type="image/webp" />
          <source srcSet="/static/img/reddit.png" type="image/png" />
          <img
            className="header__logo"
            alt="Logo"
            src="/static/img/reddit.png"
          />
        </picture>
      </div>
      <div className="header__search-container">
        <form
          method="POST"
          onSubmit={event => {
            event.preventDefault();
            if (fetch.current && fetch.current.value) {
              const { value } = fetch.current;
              Router.push(`/?fetch=${value}`, `/r/${value}`);
            }
          }}
        >
          <input
            ref={fetch}
            name="fetch"
            className="header__search"
            placeholder="Enter a Subreddit..."
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
            />
          </picture>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
