import { createGlobalStyle } from 'styled-components';
import { invert } from 'polished';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
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
    background-color: #eaeaea;
    @media (prefers-color-scheme: dark) {
      background-color: ${invert('#eaeaea')};
    }
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
