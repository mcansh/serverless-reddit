/* eslint-disable no-console */
import React from 'react';
import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';
import ErrorBoundary from 'react-error-boundary';
import dynamic from 'next/dynamic';

import Meta from '~/components/meta';
import GlobalStyle from '~/components/global-style';
import theme from '~/theme';
import { BaseUrlProvider } from '~/components/base-url-context';
import { useServiceWorker } from '~/hooks/use-service-worker';

const NextError = dynamic(() => import('next/error'));

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useServiceWorker();

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
      <BaseUrlProvider baseUrl="https://reddit.loganmcansh.com">
        <ThemeProvider theme={theme}>
          <Meta />
          <GlobalStyle />
          <NProgress color="#FF4500" showAfterMs={600} />
          <button
            css={{ position: 'absolute', top: '50%', left: '50%', zIndex: 999 }}
            onClick={() => {
              throw new Error('lol');
            }}
          >
            nice
          </button>
          <Component {...pageProps} />
        </ThemeProvider>
      </BaseUrlProvider>
    </ErrorBoundary>
  );
};

export default App;
