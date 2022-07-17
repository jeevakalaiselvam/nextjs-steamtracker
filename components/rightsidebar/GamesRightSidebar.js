import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HEADER_IMAGE } from '../../helper/urlHelper';
import { HiClock } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import AchievementNormal from '../ui/atoms/AchievementNormal';
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
  getHiddenDescriptionForName,
} from '../../helper/achievementHelper';
import axios from 'axios';
import { API_GET_HIDDEN_ACHIEVEMENTS } from '../../helper/apiHelper';
import { useRouter } from 'next/router';
import {
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL,
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL,
} from '../../helper/filterHelper';
import AchievementSmall from '../ui/atoms/AchievementSmall';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  display: 'flex';
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 300px;
  height: 150px;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9);
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CompletionContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ToGetIcon = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 4rem;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: 2rem;
`;

const CompletionIcon = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  color: #3470d2;
  font-size: 4.3rem;
  justify-content: center;
`;

const CompletionData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #3470d2;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fefefe;
  left: 0px;
  width: 100%;
  padding: 0.5rem 1rem;
  max-height: 30px;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const AchievementContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  padding: 1rem;
  justify-content: center;
`;

const AllUnlockedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
  flex: 1;
  overflow: scroll;
  padding: 1rem;
  justify-content: center;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GamesRightSidebar = (props) => {
  const router = useRouter();
  const { selectedGame, achievementDisplayOption } = props;
  const {
    appid,
    gameName,
    total,
    completed,
    percentage,
    schemaAchievements,
    playerAchievements,
    globalAchievements,
  } = selectedGame;

  const [hiddenAchievementsData, setHiddenAchievementsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const hiddenAchievements = await axios.get(
        API_GET_HIDDEN_ACHIEVEMENTS(appid)
      );
      setHiddenAchievementsData(
        (old) => hiddenAchievements.data.hiddenAchievements
      );
    };
    if (appid) {
      getData();
    }
  }, [appid]);

  const formattedAchievements = formatAchievments(
    schemaAchievements,
    globalAchievements,
    playerAchievements
  );

  const achievementsSortedByEasy = formatAchievmentsByNotUnlockedEasyPercentage(
    formattedAchievements
  );
  console.log('EASY', achievementsSortedByEasy);
  const achievementsSortedByUnlockedRecent = formatAchievmentsByUnlockedRecent(
    formattedAchievements
  );

  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Header>
        <Stat>
          <CompletionContainer>
            <CompletionIcon>
              <HiClock />
            </CompletionIcon>
            <CompletionData>{percentage}</CompletionData>
          </CompletionContainer>
          <Image
            image={HEADER_IMAGE(appid)}
            onClick={() => {
              router.push(`/games/${appid}`);
            }}
          >
            <Overlay></Overlay>
            <Title>{gameName}</Title>
          </Image>
          <ToGetContainer>
            <ToGetIcon>
              <FaTrophy />
            </ToGetIcon>
            <ToGetData>{total - completed}</ToGetData>
          </ToGetContainer>
        </Stat>
      </Header>
      <AchievementContainer>
        <SubTitle>
          {achievementsSortedByEasy.length > 0 && 'UNLOCK NEXT'}
          {achievementsSortedByEasy.length === 0 && 'ALL COMPLETED'}
        </SubTitle>
        {achievementsSortedByEasy.length > 0 && (
          <AllUnlockedContainer
            row={
              achievementDisplayOption === GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL
            }
          >
            {achievementsSortedByEasy.map((achievement) => {
              const hiddenAchievementDesc = getHiddenDescriptionForName(
                achievement.displayName,
                hiddenAchievementsData
              );
              return (
                <>
                  {achievementDisplayOption ===
                    GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL && (
                    <AchievementNormal
                      gameName={gameName}
                      key={achievement.name}
                      achievement={achievement}
                      hiddenAchievementDesc={hiddenAchievementDesc}
                    />
                  )}
                  {achievementDisplayOption ===
                    GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL && (
                    <AchievementSmall
                      gameName={gameName}
                      key={achievement.name}
                      achievement={achievement}
                      hiddenAchievementDesc={hiddenAchievementDesc}
                    />
                  )}
                </>
              );
            })}
          </AllUnlockedContainer>
        )}
        {achievementsSortedByEasy.length === 0 && (
          <AllUnlockedContainer
            row={
              achievementDisplayOption === GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL
            }
          >
            {achievementsSortedByUnlockedRecent.length > 0 &&
              achievementsSortedByUnlockedRecent.map((achievement) => {
                const hiddenAchievementDesc = getHiddenDescriptionForName(
                  achievement.displayName,
                  hiddenAchievementsData
                );
                return (
                  <>
                    {achievementDisplayOption ===
                      GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL && (
                      <AchievementNormal
                        gameName={gameName}
                        key={achievement.name}
                        achievement={achievement}
                        hiddenAchievementDesc={hiddenAchievementDesc}
                      />
                    )}
                    {achievementDisplayOption ===
                      GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL && (
                      <AchievementSmall
                        gameName={gameName}
                        key={achievement.name}
                        achievement={achievement}
                        hiddenAchievementDesc={hiddenAchievementDesc}
                      />
                    )}
                  </>
                );
              })}
          </AllUnlockedContainer>
        )}
      </AchievementContainer>
    </Container>
  );
};

export default GamesRightSidebar;
