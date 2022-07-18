import React from 'react';
import styled from 'styled-components';
import GamesMenu from '../menu/GamesMenu';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const GamesLeftSidebar = (props) => {
  const { totalXP } = props;
  return (
    <Container>
      <GamesMenu totalXP={totalXP} />
    </Container>
  );
};

export default GamesLeftSidebar;
