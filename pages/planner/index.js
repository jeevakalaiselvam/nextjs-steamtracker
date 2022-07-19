import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameContent from '../../components/content/GameContent';
import PlannerContent from '../../components/content/PlannerContent';
import GameHeader from '../../components/header/GameHeader';
import GamesLeftSidebar from '../../components/leftsidebar/GamesLeftSidebar';
import GameRightSidebar from '../../components/rightsidebar/GameRightSidebar';
import {
  API_GET_ACHIEVEMENTS,
  API_GET_GAME,
  API_TOTAL_XP,
  API_TOTAL_XP_GAME,
} from '../../helper/apiHelper';
import {
  GAMES_SORT_COMPLETION_DESC,
  GAME_ACHIEVEMENT_SORT_ALL,
  GAME_ACHIEVEMENT_SORT_EASY,
  GAME_ACHIEVEMENT_SORT_HARD,
  GAME_ACHIEVEMENT_SORT_LOCKED,
  GAME_ACHIEVEMENT_SORT_UNLOCKED,
} from '../../helper/filterHelper';
import { LOCALSTORAGE_GAME_SELECTED } from '../../helper/storageHelper';
import Page from '../../layouts/Page';

export default function Planner() {
  const router = useRouter();

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
    const selectedGame = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_GAME_SELECTED)
    );
    setGame((old) => selectedGame);
  }, []);

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

  const [XPData, setXPData] = useState(0);

  useEffect(() => {
    const getXPInfo = async () => {
      const response = await axios.get(API_TOTAL_XP_GAME(game.appid));
      const data = response.data;
      setXPData((old) => data.XPInfo);
    };
    if (game.appid) {
      getXPInfo();
    }
  }, [game.appid]);

  return (
    <>
      {game && (
        <Page
          showRightSidebar={showRightSidebar}
          leftSidebar={<GamesLeftSidebar XPData={XPData} />}
          content={<PlannerContent game={game} />}
        />
      )}
    </>
  );
}
