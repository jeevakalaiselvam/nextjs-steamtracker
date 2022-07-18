import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import styled from 'styled-components';
import { MdLeaderboard } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 3rem;
  align-items: center;
  color: #f5b81c;
  justify-content: center;
`;
const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 2rem;
  justify-content: center;
`;

const TotalXP = (props) => {
  const { totalXP } = props;

  return (
    <Container>
      <IconContainer>
        <MdLeaderboard />
      </IconContainer>
      <CountContainer>{totalXP || 0}</CountContainer>
    </Container>
  );
};

export default TotalXP;
