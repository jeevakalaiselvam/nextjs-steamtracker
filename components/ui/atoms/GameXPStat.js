import React from 'react';
import styled from 'styled-components';
import SubMenu from './SubMenu';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(3, 3, 3);
`;

const TotalXP = styled.div`
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin: 1rem 0rem;
  color: #fefefe;
  background-color: #3049d1;
  font-size: 1.5rem;
`;

const RemainingXP = styled.div`
  display: flex;
  padding: 0 7px;
  border-radius: 2px;
  margin: 1rem 0rem;
  background-color: #3049d1;
  align-items: center;
  color: rgb(3, 3, 3);
  justify-content: center;
  color: #fefefe;
  font-size: 1.5rem;
`;

const CompletedXP = styled.div`
  display: flex;
  padding: 0 7px;
  align-items: center;
  border-radius: 2px;
  margin: 1rem 0rem;
  background-color: #3049d1;
  color: #fefefe;
  justify-content: center;
  font-size: 1.5rem;
`;

export default function GameXPStat(props) {
  const { totalXP, completedXP, remainingXP } = props;
  return (
    <Container>
      <SubMenu title="Total XP" />
      <TotalXP>{totalXP} XP</TotalXP>
      <SubMenu title="Completed XP" />
      <CompletedXP>{completedXP} XP</CompletedXP>
      <SubMenu title="Remaining XP" />
      <RemainingXP>{remainingXP} XP</RemainingXP>
    </Container>
  );
}
