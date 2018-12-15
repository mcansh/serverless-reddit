import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import GlobalStyle from '../components/GlobalStyle';

const SENTRY_PUBLIC_DSN =
  'https://3adaab30151b41069d006c7631a1df0d@sentry.io/1352474';

export default class MyApp extends App {
  // $FlowFixMe
  constructor(...args) {
    // @ts-ignore
    super(...args);
    Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
  }

  // $FlowFixMe
  componentDidCatch(error, errorInfo) {
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover"
          />
          <title>Next.js: ZEIT Serverless SSR</title>
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
