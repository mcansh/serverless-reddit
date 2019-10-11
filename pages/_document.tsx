import React from 'react';
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
  Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import * as Sentry from '@sentry/browser';
import cookie from 'next-cookies';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

class MyDocument extends Document<{ theme?: 'light' | 'dark' | 'system' }> {
  public static async getInitialProps(context: DocumentContext) {
    const { theme } = cookie(context) as { theme: 'light' | 'dark' | 'system' };
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);
    return {
      ...initialProps,
      theme,
      styles: [
        ...(Array.isArray(initialProps.styles) ? initialProps.styles : []),
        ...sheet.getStyleElement(),
      ],
    };
  }

  public render() {
    return (
      <Html lang="en" className={this.props?.theme ?? ''}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
