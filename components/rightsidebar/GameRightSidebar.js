import React, { useState, useEffect } from 'react';
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
} from '../../helper/achievementHelper';
import styled from 'styled-components';
import { HiChevronRight } from 'react-icons/hi';
import AchievementNormal from '../ui/atoms/AchievementNormal';
import { FaPlus } from 'react-icons/fa';
import {
  LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY,
  LOCALSTORAGE_JOURNAL,
} from '../../helper/filterHelper';
import Video from '../ui/atoms/Video';

const HideSidebar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-size: 3rem;
  align-items: center;
`;

const HideIcon = styled.div`
  display: none;
  justify-content: center;
  font-size: 3rem;
  align-items: center;

  &:hover {
    background-color: #3049d1;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  padding: 2rem;
`;

const JournalContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JournalData = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  flex: 1;
  justify-content: center;

  & textarea {
    background-color: #1e1e1e;
    outline: none;
    border: none;
    flex: 1;
    font-weight: 300;
    padding: 1rem;
    width: 100%;
    color: #9caabe;
  }
`;

const JournalSaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  margin: 1rem 0rem 0rem 0rem;
  background-color: #3049d1;
  color: #fefefe;
  cursor: pointer;
  &:hover {
    background-color: #1e33a6;
  }
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

  const starterLocalStage = JSON.stringify({
    videos: [],
  });

  const [journalData, setJournalData] = useState('');

  const journalDataChanged = (e) => {
    const data = e.target.value;
    setJournalData((old) => data);
  };

  const saveJournalData = () => {
    localStorage.setItem(`${LOCALSTORAGE_JOURNAL}_${name}`, journalData);
  };

  useEffect(() => {
    const journalData =
      localStorage.getItem(`${LOCALSTORAGE_JOURNAL}_${name}`) || '';
    setJournalData((old) => journalData);
  }, [name]);

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
      <JournalContainer>
        <AchievementNormal
          padding="2rem"
          margin="1rem 0rem 1rem 0rem"
          disableOpacityTrigger={false}
          achievement={achievementSelected}
          hiddenAchievementDesc={achievementSelected.hiddenAchievementDesc}
          gameName={gameName}
          clickSearch={true}
        />
        <JournalData>
          <textarea
            placeholder="Enter Journal.."
            onChange={journalDataChanged}
            value={journalData}
          />
        </JournalData>
        <JournalSaveButton onClick={saveJournalData}>SAVE</JournalSaveButton>
      </JournalContainer>
    </Container>
  );
}
