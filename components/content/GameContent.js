import React from 'react';
import styled from 'styled-components';
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
} from '../../helper/achievementHelper';
import AchievementNormal from '../ui/atoms/AchievementNormal';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: scroll;
`;

const AchievementWrapper = styled.div`
  width: 450px;
  min-height: 100px;
  margin: 1rem;
`;

export default function GameContent(props) {
  const { game, openRightSidebar, closeRightSidebar } = props;

  const {
    appid,
    gameName,
    total,
    completed,
    percentage,
    schemaAchievements,
    playerAchievements,
    globalAchievements,
  } = game;

  const formattedAchievements = formatAchievments(
    schemaAchievements,
    globalAchievements,
    playerAchievements
  );

  const achievementsSortedByEasy = formatAchievmentsByNotUnlockedEasyPercentage(
    formattedAchievements
  );
  const achievementsSortedByUnlockedRecent = formatAchievmentsByUnlockedRecent(
    formattedAchievements
  );

  return (
    <Container>
      {formattedAchievements.length > 0 &&
        formattedAchievements.map((achievement) => {
          return (
            <AchievementWrapper
              key={achievement.name}
              onClick={() => {
                openRightSidebar();
              }}
            >
              <AchievementNormal
                gameName={gameName}
                achievement={achievement}
                background={'#171717'}
              />
            </AchievementWrapper>
          );
        })}
    </Container>
  );
}
