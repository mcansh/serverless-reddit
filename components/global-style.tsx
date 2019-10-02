import { createGlobalStyle } from 'styled-components';
import { invert } from 'polished';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
    --background-color: #eaeaea;
    --secondary-background-color: #fafafa;
    --sidebar-color: #999999;
    --search-border: #d0d0d0;
    --default: #000000;
    --reverse-default: #ffffff;
    --reddit-logo-color: black;
    --feed-item-box-shadow: 0 0 50px #79797922;
    @media (prefers-color-scheme: dark) {
      --background-color: ${invert('#eaeaea')};
      --secondary-background-color: ${invert('#fafafa')};
      --sidebar-color: ${invert('#999999')};
      --search-border: ${invert('#d0d0d0')};
      --default: #ffffff;
      --reverse-default: #000000;
      --reddit-logo-color: #D7DADC;
      --feed-item-box-shadow: none;
    }
  }

  html.light {
    :root {
      --background-color: #eaeaea;
      --secondary-background-color: #fafafa;
      --sidebar-color: #999999;
      --search-border: #d0d0d0;
      --default: #000000;
      --reverse-default: #ffffff;
      --reddit-logo-color: black;
      --feed-item-box-shadow: 0 0 50px #79797922;
    }
  }

  html.dark {
    :root {
      --background-color: ${invert('#eaeaea')};
      --secondary-background-color: ${invert('#fafafa')};
      --sidebar-color: ${invert('#999999')};
      --search-border: ${invert('#d0d0d0')};
      --default: #ffffff;
      --reverse-default: #000000;
      --reddit-logo-color: #D7DADC;
      --feed-item-box-shadow: none;
    }
  }

  html {
    font-size: 10px;
    box-sizing: border-box
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    width: 100%;
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background-color: var(--background-color);
  }

  html,
  body,
  #__next {
    min-height: inherit;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;
