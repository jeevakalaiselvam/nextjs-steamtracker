import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;

  & video {
    width: 100%;
    object-fit: contain;
  }
`;

export default function Video(props) {
  const { url } = props;
  return (
    <Container>
      <YouTube
        videoId={'89Hi6EPvHmU'}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Container>
  );
}
