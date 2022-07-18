import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import styled from 'styled-components';
import TrophyCount from './TrophyCount';

const Container = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #0d0c0f;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PerfectGames = (props) => {
  const { perfectGames } = props;
  const { gold, purple, silver, bronze } = perfectGames;

  return (
    <Container>
      <TrophyCount icon={<FaTrophy />} count={gold} iconColor="#f5b81c" />
      {/* <TrophyCount icon={<FaTrophy />} count={purple} iconColor="#9E33E7dd" />
      <TrophyCount icon={<FaTrophy />} count={silver} iconColor="#1EFF00aa" /> */}
      {/* <TrophyCount icon={<FaTrophy />} count={bronze} iconColor="#F77C00" /> */}
    </Container>
  );
};

export default PerfectGames;
