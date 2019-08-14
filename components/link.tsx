import styled from 'styled-components';

const Link = styled.a`
  &:link,
  &:visited {
    color: black;
    text-decoration: none;
    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }
`;

export default Link;
