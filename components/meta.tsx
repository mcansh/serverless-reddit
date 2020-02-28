import { parse, format } from 'url';

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useBaseUrl } from './base-url-context';
import { useSubredditAbout } from './subreddit-context';

const Meta = () => {
  const { asPath, query } = useRouter();
  const baseURL = useBaseUrl();

  const about = useSubredditAbout();

  const { pathname } = parse(asPath);

  const manifestStartUrl = format({
    query: {
      path: pathname,
      ...query,
    },
  });

  const description = about?.data?.public_description
    ? `${about.data.public_description} | ${process.env.DESCRIPTION}`
    : process.env.DESCRIPTION;

  const title = `${
    query.subreddit ? `${query.subreddit} |` : ''
  } Serverless Reddit`;

  const image = about?.data?.icon_img ?? `${baseURL}/icon.png`;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover"
      />

      <meta name="twitter:site" content="@loganmcansh" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta key="og:description" name="og:description" content={description} />

      <meta name="og:ttl" content="600" />
      <meta key="og:site_name" name="og:site_name" content={title} />
      <meta key="og:title" name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`${baseURL}${asPath}`} />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="256" />
      <meta name="og:image:height" content="256" />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${baseURL}/logo/apple-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${baseURL}/logo/apple-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${baseURL}/logo/apple-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${baseURL}/logo/apple-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${baseURL}/logo/apple-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${baseURL}/logo/apple-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${baseURL}/logo/apple-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${baseURL}/logo/apple-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${baseURL}/logo/apple-icon-180x180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${baseURL}/logo/android-icon-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${baseURL}/logo/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${baseURL}/logo/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${baseURL}/logo/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${baseURL}/manifest.webmanifest${manifestStartUrl}`}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${baseURL}/logo/ms-icon-144x144.png`}
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
