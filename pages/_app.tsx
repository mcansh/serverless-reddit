import * as React from 'react';
import * as Sentry from '@sentry/browser';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/GlobalStyle';
import theme from '../theme';
import { description } from '../package.json';

const SENTRY_PUBLIC_DSN =
  'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474';

export default class MyApp extends App {
  // @ts-ignore
  constructor(...args) {
    // @ts-ignore
    super(...args);
    Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
  }

  // @ts-ignore
  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);

    // @ts-ignore
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Next.js: ZEIT Serverless SSR</title>
          <meta name="description" content={description} />
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
      </Container>
    );
  }
}
