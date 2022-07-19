import React, { useState } from 'react';
import styled from 'styled-components';
import PlannerAchievements from '../ui/atoms/PlannerAchievements';

const Container = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1rem;
  flex-direction: row;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 150%;
  overflow: scroll;
  align-items: center;
  justify-content: flex-start;
`;

const Plan = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  justify-content: flex-start;
`;

const PlannerContent = (props) => {
  const { game } = props;

  const [currentGame, setCurrentGame] = useState(game);

  const refreshList = () => {
    setCurrentGame((old) => ({ ...game }));
  };

  const planStages = [1, 2, 3, 4, 5];

  return (
    <Container>
      {planStages.map((plan) => {
        return (
          <Plan key={plan}>
            <PlannerAchievements
              game={game}
              phase={String(plan)}
              refreshList={refreshList}
            />
          </Plan>
        );
      })}
    </Container>
  );
};

export default PlannerContent;
