import * as React from 'react';
import Document, { NextDocumentContext, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    const { styles } = this.props;

    return (
      <html lang="en">
        <Head>{styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
