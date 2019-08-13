import React from 'react';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '~/components/global-style';
import theme from '~/theme';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `reddit@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
});

export default class MyApp extends App {
  public componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.StrictMode>
        <Head>
          <meta name="description" content={process.env.DESCRIPTION} />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover"
          />
        </Head>
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
