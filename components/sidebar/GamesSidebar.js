import React from 'react';
import styled from 'styled-components';
import GamesMenu from '../menu/GamesMenu';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const GamesSidebar = (props) => {
  return (
    <Container>
      <GamesMenu />
    </Container>
  );
};

export default GamesSidebar;
