import { parse } from 'url';

import * as React from 'react';
import styled from 'styled-components';
import { ellipsis } from 'polished';

import StyledLink from './link';

import { Post as Props } from '~/@types/post';
import DefaultThumbnail from '~/public/static/img/icons/default_thumbnail.svg';
import Comments from '~/public/static/img/icons/comments.svg';

const PostStyles = styled(StyledLink).attrs({
  className: 'feed__feed-link feed-link',
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: block;

  &:not(:last-child) {
    border-bottom: 1px solid var(--background-color);
  }

  .feed-item {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--reverse-default);
    height: 73px;
    transition: 0.2s box-shadow ease, 0.2s background-color ease;
  }

  .feed-item:hover {
    box-shadow: 0 0 50px #79797922;
    z-index: ${props => props.theme.zIndexFeedItem};
    cursor: pointer;
    @media (prefers-color-scheme: dark) {
      box-shadow: none;
      &,
      .feed-item__voting {
        background-color: #99999911;
      }
    }
  }

  .feed-item__voting {
    position: relative;
    background-color: var(--secondary-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 70px;
    font-size: 14px;
    color: var(--default);
    height: 100%;
    transition: 0.2s background-color ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: block;
      width: 0;
      height: 0;
      border: calc(${props => props.theme.arrowSize} - 3px) solid transparent;
      border-bottom: ${props => props.theme.arrowSize} solid var(--default);
    }

    &::after {
      top: auto;
      bottom: 6px;
      border-bottom: calc(${props => props.theme.arrowSize} - 3px) solid
        transparent;
      border-top: ${props => props.theme.arrowSize} solid var(--default);
    }
  }

  .feed-item__image-container {
    display: none;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    flex: 0 0 70px;
    margin: 0 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--secondary-background-color);
    border-radius: 10px;
  }

  .feed-item__info {
    align-self: flex-start;
    margin-top: 16px;
    padding: 0 16px;
    max-width: 80%;
    flex: 1 1 auto;
  }

  .feed-item__header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .feed-item__heading {
    margin: 0 12px 0 0;
    font-size: 14px;
    color: var(--default);
    text-align: left;
    font-weight: bold;
    ${ellipsis('80%')};
  }

  .feed_item__short-link {
    line-height: normal;
    font-size: 12px;
    color: #0076ff;
    display: none;
    ${ellipsis()};
  }

  .feed-item__meta {
    line-height: normal;
    font-size: 10px;
    text-align: left;
    color: var(--default);
    ${ellipsis('100%')};
    width: 100%;
  }

  .feed-item__comments {
    display: none;
    margin: 0 30px 30px auto;
    align-self: flex-end;
    color: var(--default);
    font-size: 12px;
    font-weight: bold;

    svg {
      margin-right: 1rem;
    }
  }

  @media (min-width: 768px) {
    .feed-item__voting::before {
      top: 13px;
    }

    .feed-item__voting::after {
      bottom: 13px;
    }

    .feed-item {
      height: 100px;
    }

    .feed-item__image-container,
    .feed-item__comments {
      display: flex;
    }

    .feed-item__header {
      margin-bottom: 20px;
    }

    .feed_item__short-link {
      display: block;
    }

    .header__user-area {
      margin-left: initial;
    }

    .feed-item__meta {
      font-size: 12px;
    }

    .feed-item__info {
      max-width: 60%;
      margin-top: 24px;
    }
  }
`;

const Post = ({ post }: { post: Props }) => {
  const hasThumbnail =
    post.thumbnail && /^$|self|default|nsfw/.test(post.thumbnail);

  const { host: url } = parse(post.url);
  return (
    <PostStyles href={post.url}>
      <div className="feed__feed-item feed-item">
        <div className="feed-item__voting">{post.score}</div>
        <div
          className="feed-item__image-container"
          css={{
            border: hasThumbnail ? '1px solid #eaeaea' : undefined,
            backgroundImage: hasThumbnail
              ? undefined
              : `url(${post.thumbnail})`,
          }}
        >
          {hasThumbnail && <DefaultThumbnail />}
        </div>
        <div className="feed-item__info">
          <div className="feed-item__header">
            <h2 className="feed-item__heading" title={post.title}>
              {post.title}
            </h2>
            <span className="feed_item__short-link">{url}</span>
          </div>
          <div className="feed-item__meta">
            r/{post.subreddit} • Posted by <strong>u/{post.author}</strong>
          </div>
        </div>
        <div className="feed-item__comments">
          <Comments />
          {post.num_comments}
        </div>
      </div>
    </PostStyles>
  );
};

export default Post;
