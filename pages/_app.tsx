/* eslint-disable no-console */
import React from 'react';
import * as Sentry from '@sentry/node';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';

import Meta from '~/components/meta';
import GlobalStyle from '~/components/global-style';
import theme from '~/theme';
import { BaseUrlProvider } from '~/components/base-url-context';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
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

  public componentDidMount() {
    const messages = [
      `Version: ${process.env.VERSION}`,
      `Next.js buildId: ${process.env.BUILD_ID}`,
      `Source code: ${process.env.REPO}`,
    ];

    messages.forEach(m => console.log(m));

    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() =>
          console.error(
            'Something went wrong when registering the service worker'
          )
        );
    }
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <BaseUrlProvider baseUrl="https://reddit.loganmcansh.com">
        <ThemeProvider theme={theme}>
          <Meta />
          <GlobalStyle />
          <NProgress color="#FF4500" showAfterMs={600} />
          <Component {...pageProps} />
        </ThemeProvider>
      </BaseUrlProvider>
    );
  }
}
