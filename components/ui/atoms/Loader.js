import React from 'react';
import styled from 'styled-components';
import * as Loaders from 'react-spinners';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  return (
    <Container>
      <Loaders.HashLoader />
    </Container>
  );
}
