import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatAchievments } from "../../../helper/achievementHelper";
import {
  API_GET_HIDDEN_ACHIEVEMENTS,
  API_TOTAL_XP_GAME,
} from "../../../helper/apiHelper";
import AchievementNormal from "./AchievementNormal";
import PhaseTitleHardCode from "./PhaseTitleHardCode";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  justify-content: center;
  width: 100%;
  margin: 0.5rem;
`;

const AchievementContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  justify-content: flex-start;
  margin: 0.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 0.5rem;
`;
const PhaseData = styled.div`
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  align-items: center;
  justify-content: center;
`;

const AchievementInnerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function HistoryAchievements(props) {
  const { game, phase, refreshList } = props;
  const {
    appid: gameId,
    gameName,
    completed,
    total,
    percentage,
    schemaAchievements,
    playerAchievements,
    globalAchievements,
  } = game;

  const [searchTerm, setSearchTerm] = useState("");
  const [formattedAchievements, setFormattedAchievements] = useState([]);
  const [searchFilteredAchievements, setSearchFilteredAchievements] = useState(
    []
  );

  useEffect(() => {
    const formattedAchievements = formatAchievments(
      schemaAchievements,
      globalAchievements,
      playerAchievements
    );
    console.log("FORMATTED", formattedAchievements);
    const onlyUnlocked = formattedAchievements.filter(
      (ach) => +ach.achieved == 1
    );
    const recentlyUnlockedAchievements = onlyUnlocked.sort(
      (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
    );
    setFormattedAchievements((old) => recentlyUnlockedAchievements);
  }, []);

  useEffect(() => {
    const formattedAchievements = formatAchievments(
      schemaAchievements,
      globalAchievements,
      playerAchievements
    );
    const onlyUnlocked = formattedAchievements.filter(
      (ach) => +ach.achieved == 1
    );
    const recentlyUnlockedAchievements = onlyUnlocked.sort(
      (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
    );
    setFormattedAchievements((old) => recentlyUnlockedAchievements);
    setSearchFilteredAchievements((old) => recentlyUnlockedAchievements);
  }, [searchTerm, game]);

  useEffect(() => {
    const searchAchievements = formattedAchievements.filter((achievement) => {
      if (
        achievement.displayName.toLowerCase().includes(searchTerm) ||
        achievement.description.toLowerCase().includes(searchTerm)
      ) {
        return true;
      } else {
        return false;
      }
    });
    setSearchFilteredAchievements((old) => searchAchievements);
  }, [searchTerm]);

  const [hiddenAchievementsData, setHiddenAchievementsData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const hiddenAchievements = await axios.get(
        API_GET_HIDDEN_ACHIEVEMENTS(gameId)
      );
      setHiddenAchievementsData(
        (old) => hiddenAchievements.data.hiddenAchievements
      );
    };
    if (gameId) {
      getData();
    }
  }, [gameId]);

  const searchTextChanged = (searchTerm) => {
    setSearchTerm((old) => searchTerm);
  };

  const [XPData, setXPData] = useState(0);

  useEffect(() => {
    const getXPInfo = async () => {
      const response = await axios.get(API_TOTAL_XP_GAME(gameId));
      const data = response.data;
      setXPData((old) => data.XPInfo);
    };
    if (gameId) getXPInfo();
  }, [gameId]);

  return (
    <Container>
      <SearchContainer>
        <PhaseData>
          <PhaseTitleHardCode title={`PHASE ${phase}`} phase={phase} />
        </PhaseData>
        <Search onSearchObtained={searchTextChanged} width="200px" />
      </SearchContainer>

      <AchievementContainer>
        {console.log("SEARCH FILTERED", searchFilteredAchievements)}
        {searchFilteredAchievements.length > 0 &&
          searchFilteredAchievements.map((achievement) => {
            const hiddenDescription = hiddenAchievementsData.find(
              (hiddenAchievement) => {
                if (
                  hiddenAchievement.name.toLowerCase().trim() ==
                  achievement.displayName.toLowerCase().trim()
                ) {
                  return true;
                } else {
                  return false;
                }
              }
            );
            const { description } = hiddenDescription || "HIDDEN";
            return (
              <AchievementNormal
                key={achievement.apiname}
                margin="0rem 0rem 1rem 0rem"
                padding="1rem"
                achievement={achievement}
                background={"#171717"}
                phase={phase}
                gameId={gameId}
                phaseActivateShow={false}
                refreshList={refreshList}
                clickSearch={true}
                hiddenAchievementDesc={description}
              />
            );
          })}
      </AchievementContainer>
    </Container>
  );
}
