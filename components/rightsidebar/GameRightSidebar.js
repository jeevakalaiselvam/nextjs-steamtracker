import React, { useState, useEffect } from 'react';
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
} from '../../helper/achievementHelper';
import styled from 'styled-components';
import { HiChevronRight } from 'react-icons/hi';
import AchievementNormal from '../ui/atoms/AchievementNormal';

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

const JournalVideo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function GameRightSidebar(props) {
  const { game, closeRightSidebar, openRightSidebar, achievementSelected } =
    props;
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

  const {
    name,
    displayName,
    description,
    icon,
    icongray,
    achieved,
    apiname,
    hidden,
    percent,
    hiddenAchievementDesc,
    unlocktime,
  } = achievementSelected;
  console.log(achievementSelected);

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

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videos = localStorage.getItem(``);
  }, []);

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
      <JournalVideo>
        <AchievementNormal
          padding="2rem"
          margin="1rem 0rem 1rem 0rem"
          disableOpacityTrigger={true}
          achievement={achievementSelected}
          hiddenAchievementDesc={achievementSelected.hiddenAchievementDesc}
          gameName={gameName}
          clickSearch={true}
        />
      </JournalVideo>
    </Container>
  );
}
