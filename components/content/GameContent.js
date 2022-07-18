import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  filterAchievementsLockedOnly,
  filterAchievementsUnlockedOnly,
  formatAchievments,
  formatAchievmentsByNotUnlockedEasyPercentage,
  formatAchievmentsByUnlockedRecent,
  getHiddenDescriptionForName,
  sortAchievmentsByEasy,
  sortAchievmentsByHard,
} from '../../helper/achievementHelper';
import { API_GET_HIDDEN_ACHIEVEMENTS } from '../../helper/apiHelper';
import {
  GAME_ACHIEVEMENT_SORT_ALL,
  GAME_ACHIEVEMENT_SORT_EASY,
  GAME_ACHIEVEMENT_SORT_HARD,
  GAME_ACHIEVEMENT_SORT_LOCKED,
  GAME_ACHIEVEMENT_SORT_UNLOCKED,
} from '../../helper/filterHelper';
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
  margin: 0rem 1rem 1rem 0rem;
`;

export default function GameContent(props) {
  const {
    game,
    openRightSidebar,
    closeRightSidebar,
    filterOption,
    filterLockUnlockOption,
    searchTerm,
    onAchievementSelect,
  } = props;

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

  const [filteredAchievements, setFilteredAchievements] = useState(
    formattedAchievements
  );

  const [searchFilteredAchievements, setSearchFilteredAchievements] =
    useState('');

  useEffect(() => {
    const searchAchievements = filteredAchievements.filter((achievement) => {
      if (achievement.displayName.toLowerCase().includes(searchTerm)) {
        return true;
      } else {
        return false;
      }
    });
    setSearchFilteredAchievements((old) => searchAchievements);
  }, [
    searchTerm,
    filteredAchievements,
    filterOption,
    filterLockUnlockOption,
    game,
  ]);

  useEffect(() => {
    if (filterOption === GAME_ACHIEVEMENT_SORT_EASY) {
      const easySortedAchievements = sortAchievmentsByEasy(
        formattedAchievements
      );

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_ALL) {
        setFilteredAchievements((old) => easySortedAchievements);
      }

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_LOCKED) {
        const onlyLockedAchievements = filterAchievementsLockedOnly(
          easySortedAchievements
        );
        setFilteredAchievements((old) => onlyLockedAchievements);
      }

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_UNLOCKED) {
        const onlyUnlockedAchievements = filterAchievementsUnlockedOnly(
          easySortedAchievements
        );
        setFilteredAchievements((old) => onlyUnlockedAchievements);
      }
    }
    if (filterOption === GAME_ACHIEVEMENT_SORT_HARD) {
      const hardSortedAchievements = sortAchievmentsByHard(
        formattedAchievements
      );

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_ALL) {
        setFilteredAchievements((old) => hardSortedAchievements);
      }

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_LOCKED) {
        const onlyLockedAchievements = filterAchievementsLockedOnly(
          hardSortedAchievements
        );
        setFilteredAchievements((old) => onlyLockedAchievements);
      }

      if (filterLockUnlockOption === GAME_ACHIEVEMENT_SORT_UNLOCKED) {
        const onlyUnlockedAchievements = filterAchievementsUnlockedOnly(
          hardSortedAchievements
        );
        setFilteredAchievements((old) => onlyUnlockedAchievements);
      }
    }
  }, [filterOption, filterLockUnlockOption, game]);

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

  return (
    <Container>
      {searchFilteredAchievements.length > 0 &&
        searchFilteredAchievements.map((achievement) => {
          const hiddenAchievementDesc = getHiddenDescriptionForName(
            achievement.displayName,
            hiddenAchievementsData
          );
          return (
            <AchievementWrapper
              key={achievement.name}
              onClick={() => {
                openRightSidebar();
                onAchievementSelect(achievement, hiddenAchievementDesc);
              }}
            >
              <AchievementNormal
                padding="1rem"
                margin="0rem 0rem 0rem 0rem"
                clickSearch={false}
                gameName={gameName}
                achievement={achievement}
                background={'#2d2d2d'}
                hiddenAchievementDesc={hiddenAchievementDesc}
                disableOpacityTrigger={true}
              />
            </AchievementWrapper>
          );
        })}
    </Container>
  );
}
