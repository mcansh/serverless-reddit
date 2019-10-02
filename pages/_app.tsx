/* eslint-disable no-console */
import React from 'react';
import * as Sentry from '@sentry/browser';
import App, { AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { getBaseURL } from '@mcansh/next-now-base-url';
import { NProgress } from '@mcansh/next-nprogress';
import '@reach/dialog/styles.css';

import Meta from '~/components/meta';
import GlobalStyle from '~/components/global-style';
import theme from '~/theme';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `reddit@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
});

interface Props {
  baseURL: string;
}

export default class MyApp extends App<Props> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
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
    const { Component, pageProps, baseURL } = this.props;
    return (
      <React.StrictMode>
        <Meta baseURL={baseURL} />
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <NProgress color="#FF4500" showAfterMs={600} />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
