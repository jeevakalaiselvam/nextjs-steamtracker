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
import { LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY } from '../../helper/filterHelper';
import Video from '../ui/atoms/Video';

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

const JournalContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JournalVideo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const VideoInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const VideoListContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const VideoInput = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  & input {
    outline: none;
    width: 100%;
    padding: 0.5rem;
    background: #1e1e1e;
    color: #9caabe;
    padding: 0.5rem 1.2rem;
    border: none;
    border-radius: 4px;

    &::placeholder {
      color: #9caabe;
    }
  }
`;

const VideoAddButton = styled.div`
  display: flex;
  width: 26px;
  height: 26px;
  cursor: pointer;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
  background-color: #3049d1;

  &:hover {
    background-color: #15278c;
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

  const starterLocalStage = {
    videos: [],
  };

  const [videos, setVideos] = useState(
    JSON.parse(
      localStorage.getItem(`${name}-${'LOCALSTORAGE'}`) || starterLocalStage
    ).videos
  );

  console.log('VIDEOS', videos);

  const [videoInput, setVideoInput] = useState('');

  const onVideoInputChange = (e) => {
    const value = e.target.value;
    setVideoInput((old) => value);
  };

  const addVideoToStorage = () => {
    const oldData =
      JSON.parse(localStorage.getItem(`${name}-${'LOCALSTORAGE'}`)) ||
      starterLocalStage;
    oldData.videos.push(videoInput);
    localStorage.setItem(`${name}-${'LOCALSTORAGE'}`, JSON.stringify(oldData));
    setVideos((old) => oldData.videos);
  };

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
      <JournalContainer>
        <AchievementNormal
          padding="2rem"
          margin="1rem 0rem 1rem 0rem"
          disableOpacityTrigger={true}
          achievement={achievementSelected}
          hiddenAchievementDesc={achievementSelected.hiddenAchievementDesc}
          gameName={gameName}
          clickSearch={true}
        />
        <JournalVideo>
          <VideoInputContainer>
            <VideoInput>
              <input
                type="text"
                value={videoInput}
                onChange={onVideoInputChange}
                placeholder="Enter Video.."
              />
            </VideoInput>
            <VideoAddButton onClick={addVideoToStorage}>
              <FaPlus />
            </VideoAddButton>
          </VideoInputContainer>
          <VideoListContainer>
            {videos.length > 0 &&
              videos.map((video) => {
                return <Video url={video} key={video} />;
              })}
          </VideoListContainer>
        </JournalVideo>
      </JournalContainer>
    </Container>
  );
}
