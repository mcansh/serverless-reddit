/* eslint-disable no-console */
import React from 'react';
import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';
import { ErrorBoundary } from 'react-error-boundary';
import * as Fathom from 'fathom-client';
import Router from 'next/router';
import NextError from 'next/error';

import GlobalStyle from '~/components/global-style';
import theme from '~/theme';
import { useServiceWorker } from '~/hooks/use-service-worker';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useServiceWorker();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(process.env.FATHOM_SITE_ID, {
        excludedDomains: ['localhost'],
      });
    }
  }, []);

  React.useEffect(() => {
    const messages = [
      `Version: ${process.env.VERSION}`,
      `Next.js buildId: ${process.env.BUILD_ID}`,
      `Source code: ${process.env.REPO}`,
    ];

    messages.forEach(m => console.log(m));
  }, []);

  return (
    <ErrorBoundary
      onError={error => {
        Sentry.captureException(error);
      }}
      FallbackComponent={() => <NextError statusCode={500} />}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NProgress color="#FF4500" spinner={false} showAfterMs={600} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
