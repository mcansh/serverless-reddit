import { format } from 'url';

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSubredditAbout } from './subreddit-context';

const Meta = () => {
  const { asPath, query } = useRouter();

  const about = useSubredditAbout();

  const { pathname } = new URL(asPath, 'https://reddit.com');

  const canonical = `${process.env.API_BASE}${pathname}`;

  const manifestUrl = format({
    pathname: '/manifest.webmanifest',
    query,
  });

  const description = about?.data?.public_description
    ? `${about.data.public_description} | ${process.env.DESCRIPTION}`
    : process.env.DESCRIPTION;

  const title = `${
    query.subreddit ? `${query.subreddit} | ` : ''
  }Serverless Reddit`;

  const image = about?.data?.icon_img
    ? about.data.icon_img
    : about?.data?.community_icon
    ? about.data.community_icon
    : `${process.env.BASE_URL}/icon.png`;

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
      <meta name="og:url" content={`${process.env.BASE_URL}${asPath}`} />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="256" />
      <meta name="og:image:height" content="256" />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${process.env.BASE_URL}/logo/apple-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${process.env.BASE_URL}/logo/apple-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${process.env.BASE_URL}/logo/apple-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${process.env.BASE_URL}/logo/apple-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${process.env.BASE_URL}/logo/apple-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${process.env.BASE_URL}/logo/apple-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${process.env.BASE_URL}/logo/apple-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${process.env.BASE_URL}/logo/apple-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.BASE_URL}/logo/apple-icon-180x180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${process.env.BASE_URL}/logo/android-icon-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${process.env.BASE_URL}/logo/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${process.env.BASE_URL}/logo/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${process.env.BASE_URL}/logo/favicon-16x16.png`}
      />
      <link rel="manifest" href={manifestUrl} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${process.env.BASE_URL}/logo/ms-icon-144x144.png`}
      />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="canonical" href={canonical} />
    </Head>
  );
};

export default Meta;
