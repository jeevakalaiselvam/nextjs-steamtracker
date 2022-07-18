import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameContent from '../../../components/content/GameContent';
import GameHeader from '../../../components/header/GameHeader';
import GamesLeftSidebar from '../../../components/leftsidebar/GamesLeftSidebar';
import GameRightSidebar from '../../../components/rightsidebar/GameRightSidebar';
import { API_GET_ACHIEVEMENTS, API_GET_GAME } from '../../../helper/apiHelper';
import {
  GAMES_SORT_COMPLETION_DESC,
  GAME_ACHIEVEMENT_SORT_ALL,
  GAME_ACHIEVEMENT_SORT_EASY,
  GAME_ACHIEVEMENT_SORT_HARD,
  GAME_ACHIEVEMENT_SORT_LOCKED,
  GAME_ACHIEVEMENT_SORT_UNLOCKED,
} from '../../../helper/filterHelper';
import Page from '../../../layouts/Page';

export default function Game() {
  const router = useRouter();
  const { gameId } = router.query;
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

  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const openRightSidebar = (data) => {
    setShowRightSidebar((old) => true);
  };

  const closeRightSidebar = () => {
    setShowRightSidebar((old) => false);
  };

  const [game, setGame] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState(filterOptions[0].id);
  const [filterLockUnlockOption, setFilterLockUnlockOption] = useState(
    lockedUnlockedFilterOptions[0].id
  );

  useEffect(() => {
    const getGame = async () => {
      const response = await axios.get(API_GET_ACHIEVEMENTS(gameId));
      const data = response.data.game;
      setGame((old) => data);
    };
    getGame();
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

  const [achievementSelected, setAchievementSelected] = useState({});
  const onAchievementSelect = (achievement, hiddenAchievementDesc) => {
    setAchievementSelected((old) => ({
      ...achievement,
      hiddenAchievementDesc,
    }));
  };

  return (
    <>
      {game && (
        <Page
          showRightSidebar={showRightSidebar}
          leftSidebar={<GamesLeftSidebar />}
          header={
            <GameHeader
              filterOptions={filterOptions}
              searchTextChanged={searchTextChanged}
              onFilterChanged={onFilterChanged}
              lockedUnlockedFilterChanged={lockedUnlockedFilterChanged}
              lockedUnlockedFilterOptions={lockedUnlockedFilterOptions}
            />
          }
          content={
            <GameContent
              game={game}
              searchTerm={searchTerm}
              filterOption={filterOption}
              filterLockUnlockOption={filterLockUnlockOption}
              openRightSidebar={openRightSidebar}
              closeRightSidebar={closeRightSidebar}
              onAchievementSelect={onAchievementSelect}
            />
          }
          rightSidebar={
            true && (
              <GameRightSidebar
                game={game}
                achievementSelected={achievementSelected}
                openRightSidebar={openRightSidebar}
                closeRightSidebar={closeRightSidebar}
              />
            )
          }
        />
      )}
    </>
  );
}
