import styled from 'styled-components';

const Link = styled.a`
  &:link,
  &:visited {
    color: env(--default);
    text-decoration: none;
  }
`;

export default Link;
