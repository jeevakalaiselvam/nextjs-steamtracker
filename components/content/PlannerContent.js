import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import HistoryAchievements from "../ui/atoms/HistoryAchievements";
import PlannerAchievements from "../ui/atoms/PlannerAchievements";

const Container = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1rem;
  flex-direction: row;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100%;
  position: relative;
  overflow: scroll;
  align-items: center;
  justify-content: flex-start;
`;

const OverlayImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${(props) => props.imageURL});
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(40px);
`;

const Plan = styled.div`
  display: flex;
  flex: 1;
  z-index: 2;
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

  useEffect(() => {
    setCurrentGame((old) => game);
  }, [game]);

  const refreshList = () => {
    setCurrentGame((old) => ({ ...game }));
  };

  const planStages = [1, 2, 3, 4, 5];

  return (
    <Container>
      {planStages.map((plan) => {
        if (plan === 5) {
          return (
            <Plan key={plan}>
              <HistoryAchievements
                game={currentGame}
                phase={String(plan)}
                refreshList={refreshList}
              />
            </Plan>
          );
        } else {
          return (
            <Plan key={plan}>
              <PlannerAchievements
                game={currentGame}
                phase={String(plan)}
                refreshList={refreshList}
              />
            </Plan>
          );
        }
      })}
      <OverlayImage imageURL={HEADER_IMAGE(game.appid)} />
    </Container>
  );
};

export default PlannerContent;
