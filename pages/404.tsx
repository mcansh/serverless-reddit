import React from 'react';
import { NextPage } from 'next';
import { SimpleImg } from 'react-simple-img';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 1.8rem;
    font-weight: normal;
    margin: 1rem 0;
  }

  p {
    font-size: 1.4rem;
  }
`;

const images = ['a', 'b', 'c', 'd', 'e'];

const NotFound: NextPage = () => {
  const [image, setImage] = React.useState<string>('e');

  React.useEffect(() => {
    setImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <Container>
      <SimpleImg
        src={`/static/img/404/reddit404${image}.png`}
        width={500}
        height={448}
        placeholder="var(--background-color)"
        imgStyle={{
          maxHeight: '44.8rem',
          maxWidth: '50rem',
          width: '95%',
          objectFit: 'contain',
        }}
      />
      <h1>page not found</h1>
      <p>the page you requested does not exist</p>
    </Container>
  );
};

export default NotFound;
