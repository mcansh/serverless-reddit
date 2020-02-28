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
    @media (prefers-color-scheme: dark) {
      --background-color: ${invert('#eaeaea')};
      --secondary-background-color: ${invert('#fafafa')};
      --sidebar-color: ${invert('#999999')};
      --search-border: ${invert('#d0d0d0')};
      --default: #ffffff;
      --reverse-default: #000000;
    }
  }

  html {
    font-size: 10px;
    box-sizing: border-box;
    height: 100%;
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

  body,
  #__next {
    height: inherit;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;
