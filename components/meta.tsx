import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = () => {
  const { asPath } = useRouter();

  return (
    <Head>
      <meta name="description" content={process.env.DESCRIPTION} />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover"
      />
      <meta property="og:ttl" content="600" />
      <meta property="og:site_name" content="serverless reddit" />
      <meta property="twitter:site" content="@loganmcansh" />
      <meta name="twitter:description" content={process.env.DESCRIPTION} />
      <meta property="twitter:card" content="summary" />
      <meta property="og:description" content={process.env.DESCRIPTION} />
      <meta property="og:title" content="serverless reddit" />
      <meta property="twitter:title" content="loganmcansh" />
      <meta
        property="twitter:image"
        content="https://reddit.loganmcansh.com/icon.png"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://reddit.loganmcansh.com${asPath}`}
      />
      <meta
        property="og:image"
        content="https://reddit.loganmcansh.com/icon.png"
      />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="https://reddit.loganmcansh.com/logo/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="https://reddit.loganmcansh.com/logo/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="https://reddit.loganmcansh.com/logo/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="https://reddit.loganmcansh.com/logo/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="https://reddit.loganmcansh.com/logo/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="https://reddit.loganmcansh.com/logo/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="https://reddit.loganmcansh.com/logo/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="https://reddit.loganmcansh.com/logo/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://reddit.loganmcansh.com/logo/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="https://reddit.loganmcansh.com/logo/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://reddit.loganmcansh.com/logo/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="https://reddit.loganmcansh.com/logo/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://reddit.loganmcansh.com/logo/favicon-16x16.png"
      />
      <link
        rel="manifest"
        href="https://reddit.loganmcansh.com/manifest.webmanifest"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="https://reddit.loganmcansh.com/logo/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
    </Head>
  );
};

export default Meta;
