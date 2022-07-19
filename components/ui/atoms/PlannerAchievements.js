import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  filterAchievementsLockedOnly,
  filterAchievementsUnlockedOnly,
  formatAchievments,
  sortAchievmentsByEasy,
  sortAchievmentsByHard,
} from '../../../helper/achievementHelper';
import {
  API_GET_HIDDEN_ACHIEVEMENTS,
  API_TOTAL_XP_GAME,
} from '../../../helper/apiHelper';
import {
  GAME_ACHIEVEMENT_SORT_ALL,
  GAME_ACHIEVEMENT_SORT_EASY,
  GAME_ACHIEVEMENT_SORT_HARD,
  GAME_ACHIEVEMENT_SORT_LOCKED,
  GAME_ACHIEVEMENT_SORT_UNLOCKED,
} from '../../../helper/filterHelper';
import AchievementNormal from './AchievementNormal';
import Filter from './Filter';
import PhaseTitle from './PhaseTitle';
import Search from './Search';

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

export default function PlannerAchievements(props) {
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

  const formattedAchievements = formatAchievments(
    schemaAchievements,
    globalAchievements,
    playerAchievements
  );

  const filterOptions = [
    {
      id: GAME_ACHIEVEMENT_SORT_EASY,
      title: 'Filter by Easy',
    },
    {
      id: GAME_ACHIEVEMENT_SORT_HARD,
      title: 'Filter by Hard',
    },
  ];

  const lockedUnlockedFilterOptions = [
    {
      id: GAME_ACHIEVEMENT_SORT_ALL,
      title: 'Show All',
    },
    {
      id: GAME_ACHIEVEMENT_SORT_LOCKED,
      title: 'Show Locked',
    },
    {
      id: GAME_ACHIEVEMENT_SORT_UNLOCKED,
      title: 'Show Unlocked',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState(filterOptions[0].id);
  const [filterLockUnlockOption, setFilterLockUnlockOption] = useState(
    lockedUnlockedFilterOptions[1].id
  );

  const [filteredAchievements, setFilteredAchievements] = useState(
    formattedAchievements
  );

  const [searchFilteredAchievements, setSearchFilteredAchievements] =
    useState('');

  useEffect(() => {
    const searchAchievements = filteredAchievements.filter((achievement) => {
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

  const onFilterChanged = (filterOption) => {
    switch (filterOption) {
      case GAME_ACHIEVEMENT_SORT_EASY:
        setFilterOption((old) => GAME_ACHIEVEMENT_SORT_EASY);
        break;
      case GAME_ACHIEVEMENT_SORT_HARD:
        setFilterOption((old) => GAME_ACHIEVEMENT_SORT_HARD);
        break;
      default:
        break;
    }
  };

  const lockedUnlockedFilterChanged = (filterOption) => {
    switch (filterOption) {
      case GAME_ACHIEVEMENT_SORT_ALL:
        setFilterLockUnlockOption((old) => GAME_ACHIEVEMENT_SORT_ALL);
        break;
      case GAME_ACHIEVEMENT_SORT_LOCKED:
        setFilterLockUnlockOption((old) => GAME_ACHIEVEMENT_SORT_LOCKED);
        break;
      case GAME_ACHIEVEMENT_SORT_UNLOCKED:
        setFilterLockUnlockOption((old) => GAME_ACHIEVEMENT_SORT_UNLOCKED);
        break;
      default:
        break;
    }
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
      {/* <FilterContainer>
        <Filter
          onFilterChanged={onFilterChanged}
          filterOptions={filterOptions}
        />
        <Filter
          onFilterChanged={lockedUnlockedFilterChanged}
          filterOptions={lockedUnlockedFilterOptions}
        />
      </FilterContainer> */}
      <SearchContainer>
        <PhaseData>
          <PhaseTitle title={`PHASE ${phase}`} phase={phase} />
        </PhaseData>
        <Search onSearchObtained={searchTextChanged} width="200px" />
      </SearchContainer>

      <AchievementContainer>
        {searchFilteredAchievements.length > 0 &&
          searchFilteredAchievements.map((achievement) => {
            return (
              <AchievementNormal
                key={achievement.apiname}
                margin="0rem 0rem 1rem 0rem"
                padding="1rem"
                achievement={achievement}
                background={'#171717'}
                phase={phase}
                gameId={gameId}
                phaseActivateShow={true}
                refreshList={refreshList}
                clickSearch={true}
              />
            );
          })}
      </AchievementContainer>
    </Container>
  );
}
