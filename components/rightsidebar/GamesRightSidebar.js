import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import { HiChartBar, HiGlobe, HiCheck } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import AchievementNormal from "../ui/atoms/AchievementNormal";
import {
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
  getHiddenDescriptionForName,
} from "../../helper/achievementHelper";
import axios from "axios";
import { API_GET_HIDDEN_ACHIEVEMENTS } from "../../helper/apiHelper";
import { useRouter } from "next/router";
import {
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL,
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL,
} from "../../helper/filterHelper";
import AchievementSmall from "../ui/atoms/AchievementSmall";
import GameCardVisible from "../ui/molecules/GameCardVisible";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  display: "flex";
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 400px;
  height: 200px;
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
  padding: 1rem 2rem 0rem 1rem;
  justify-content: center;
  position: relative;
  margin-right: -1rem;
  overflow: scroll;
`;

const AllUnlockedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  flex-wrap: ${(props) => (props.row ? "wrap" : "no-wrap")};
  flex: 1;
  overflow: scroll;
  margin-right: -1rem;
  padding: 1rem 2rem 0rem 1rem;
  justify-content: flex-start;
  overflow: scroll;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const SmallAchievementContainer = styled.div`
  display: flex;
  background-color: #121212;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(${(props) => (props.show ? "0%" : "100%")});
  transition: 0.5s all;
  width: 100%;
`;

const ContainerSmall = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  background-color: "#1e1e1e";
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
`;

const TitleDescContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  min-height: 70px;
  width: 100%;
`;

const TitleSmall = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0rem 1rem;
  justify-content: flex-start;
  font-size: 1.5rem;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem 1rem;
  color: #6c6c6e;
  width: 100%;
  flex: 1;
  font-size: 1.5rem;
  font-weight: 300;
`;

const CompletedIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fefefe;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 4px 0 4px;
`;

const PercentageContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fefefe;
  padding: 0.5rem;
  border-radius: 0 4px 0 4px;
`;

const PercentageIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5 0.5rem 0.5rem 0rem;
  font-size: 2rem;
  font-weight: 300;
  color: #737c9d;
`;
const PercentageText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #737c9d;
  font-weight: 300;
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
  const [
    showSmallIconAchievementContainer,
    setShowSmallIconAchievementContainer,
  ] = useState(false);
  const [smallAchievement, setSmallAchievement] = useState({});

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
    unlocktime,
    hiddenAchievementDesc,
  } = smallAchievement;

  useEffect(() => {
    const getData = async () => {
      const hiddenAchievements = await axios.get(
        API_GET_HIDDEN_ACHIEVEMENTS(appid)
      );
      setHiddenAchievementsData(
        (old) => hiddenAchievements.data.hiddenAchievements
      );
    };
    if (appid && name) {
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
  const achievementsSortedByUnlockedRecent = formatAchievmentsByUnlockedRecent(
    formattedAchievements
  );

  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Header>
        <GameCardVisible
          game={selectedGame}
          openRightSidebar={() => {}}
          closeRightSidebar={() => {}}
          onGameInitialChanged={() => {}}
          width="400px"
          height="200px"
          iconSize="2.5rem"
          textSize="1.5rem"
          navigateToGame={true}
        />
      </Header>
      <AchievementContainer>
        <SubTitle>
          {achievementsSortedByEasy.length > 0 && "UNLOCK NEXT"}
          {achievementsSortedByEasy.length === 0 && "ALL COMPLETED"}
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
                      disableOpacityTrigger={true}
                      padding="1rem"
                      margin="0rem 0rem 1rem 0rem"
                      clickSearch={true}
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
                      onMouseEnter={(achievement) => {
                        setSmallAchievement((old) => achievement);
                        setShowSmallIconAchievementContainer((old) => true);
                      }}
                      onMouseLeave={(achievement) => {
                        setSmallAchievement((old) => achievement);
                        setShowSmallIconAchievementContainer((old) => false);
                      }}
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
                  <React.Fragment key={achievement.name}>
                    {achievementDisplayOption ===
                      GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL && (
                      <AchievementNormal
                        padding="2rem"
                        margin="0rem 0rem 1rem 0rem"
                        clickSearch={true}
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
                        onMouseEnter={(achievement) => {
                          setSmallAchievement((old) => achievement);
                          setShowSmallIconAchievementContainer((old) => true);
                        }}
                        onMouseLeave={(achievement) => {
                          setSmallAchievement((old) => achievement);
                          setShowSmallIconAchievementContainer((old) => false);
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </AllUnlockedContainer>
        )}
      </AchievementContainer>

      {achievementDisplayOption === GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL && (
        <SmallAchievementContainer show={true}>
          <ContainerSmall
            onClick={() => {
              if (window !== "undefined") {
                const searchQuery = `${displayName} ${gameName} achievement`;
                window.open(`https://www.google.com/search?q=${searchQuery}`);
              }
            }}
          >
            <PercentageContainer>
              <PercentageIcon>
                <HiGlobe />
              </PercentageIcon>
              <PercentageText>{Math.floor(percent)} %</PercentageText>
            </PercentageContainer>
            <IconContainer image={icon}>
              {achieved == 1 && (
                <CompletedIcon>
                  <HiCheck />
                </CompletedIcon>
              )}
            </IconContainer>
            <TitleDescContainer>
              <TitleSmall>{displayName}</TitleSmall>
              <Description>
                {hiddenAchievementDesc || description || ""}
              </Description>
            </TitleDescContainer>
          </ContainerSmall>
        </SmallAchievementContainer>
      )}
    </Container>
  );
};

export default GamesRightSidebar;
