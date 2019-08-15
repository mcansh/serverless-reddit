import React from 'react';
import * as Sentry from '@sentry/browser';
import App, { AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';

import Meta from '~/components/meta';
import GlobalStyle from '~/components/global-style';
import theme from '~/theme';
import { getBaseURL } from '~/utils/get-base-url';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `reddit@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
});

export default class MyApp extends App<{ baseURL: string }> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const baseURL = getBaseURL(ctx.req);

    return { pageProps, baseURL };
  };

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount() {
    console.log(`Version: ${process.env.VERSION}`);
    console.log(`Next.js buildId: ${process.env.BUILD_ID}`);
    console.log(`Source code: ${process.env.REPO}`);
  }

  render() {
    const { Component, pageProps, baseURL } = this.props;
    return (
      <React.StrictMode>
        <Meta baseURL={baseURL} />
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
