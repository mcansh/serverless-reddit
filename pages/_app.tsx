import React from 'react';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';

import Meta from '~/components/meta';
import GlobalStyle from '~/components/global-style';
import theme from '~/theme';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `reddit@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
});

export default class MyApp extends App {
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
    const { Component, pageProps } = this.props;
    return (
      <React.StrictMode>
        <Meta />
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
