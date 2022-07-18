import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  & video {
    width: 100%;
    object-fit: contain;
  }
`;

export default function Video(props) {
  const { url } = props;
  return (
    <Container>
      <video src="url"></video>
    </Container>
  );
}
