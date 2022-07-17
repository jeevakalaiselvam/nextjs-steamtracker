import React from 'react';
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
} from '../../helper/achievementHelper';
import styled from 'styled-components';
import { HiChevronRight } from 'react-icons/hi';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

const HideSidebar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-size: 3rem;
  align-items: center;
`;

const HideIcon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  align-items: center;

  &:hover {
    background-color: #3049d1;
    cursor: pointer;
  }
`;

export default function GameRightSidebar(props) {
  const { game, closeRightSidebar, openRightSidebar } = props;
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
      <HideSidebar>
        <HideIcon
          onClick={() => {
            closeRightSidebar();
          }}
        >
          <HiChevronRight />
        </HideIcon>
      </HideSidebar>
    </Container>
  );
}
