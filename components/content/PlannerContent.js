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
  max-width: 150%;
  overflow: scroll;
  align-items: center;
  justify-content: center;
`;

const Plan1 = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  justify-content: flex-start;
`;

const Plan3 = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  justify-content: flex-start;
`;

const Plan2 = styled.div`
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

  return (
    <Container>
      <Plan1>
        <PlannerAchievements
          game={game}
          phase={'1'}
          refreshList={refreshList}
        />
      </Plan1>
      <Plan2>
        <PlannerAchievements
          game={game}
          phase={'2'}
          refreshList={refreshList}
        />
      </Plan2>
      <Plan3>
        <PlannerAchievements
          game={game}
          phase={'3'}
          refreshList={refreshList}
        />
      </Plan3>
      <Plan3>
        <PlannerAchievements
          game={game}
          phase={'3'}
          refreshList={refreshList}
        />
      </Plan3>
      <Plan3>
        <PlannerAchievements
          game={game}
          phase={'3'}
          refreshList={refreshList}
        />
      </Plan3>
    </Container>
  );
};

export default PlannerContent;
