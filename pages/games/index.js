import Page from '../../layouts/Page';
import GamesContent from '../../components/content/GamesContent';
import GamesLeftSidebar from '../../components/leftsidebar/GamesLeftSidebar';
import GamesRightSidebar from '../../components/rightsidebar/GamesRightSidebar';
import GamesHeader from '../../components/header/GamesHeader';
import { useEffect, useState } from 'react';
import { API_GET_GAMES } from '../../helper/apiHelper';
import axios from 'axios';
import {
  GAMES_SORT_COMPLETION_ASC,
  GAMES_SORT_COMPLETION_DESC,
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL,
  GAME_SETTING_DISPLAY_VISIBLE,
  LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY,
  LOCALSTORAGE_GAME_SETTING_DISPLAY,
} from '../../helper/filterHelper';
import Loader from '../../components/ui/atoms/Loader';

export default function Home() {
  const filterOptions = [
    {
      id: GAMES_SORT_COMPLETION_DESC,
      title: 'Filter by Completion [High to Low]',
    },
    {
      id: GAMES_SORT_COMPLETION_ASC,
      title: 'Filter by Completion [Low to High]',
    },
  ];

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState(filterOptions[0].id);
  const [gamesDisplayOption, setGamesDisplayOption] = useState(
    GAME_SETTING_DISPLAY_VISIBLE
  );

  const [achievementDisplayOption, setAchievementDisplayOption] = useState(
    GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL
  );

  useEffect(() => {
    if (window !== 'undefined') {
      setGamesDisplayOption(
        (old) =>
          localStorage.getItem(LOCALSTORAGE_GAME_SETTING_DISPLAY) ||
          GAME_SETTING_DISPLAY_VISIBLE
      );
      setAchievementDisplayOption(
        (old) =>
          localStorage.getItem(
            LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY
          ) || GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL
      );
    }
  }, []);

  useEffect(() => {
    const newGames = games.map((game) => game);
    setGames((old) => newGames);
  }, [gamesDisplayOption, achievementDisplayOption]);

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get(API_GET_GAMES());
      const newGames = response.data.games;
      const completionAddedGames = newGames.map((game) => {
        let newGame = {};
        const completed = game.playerAchievements.reduce((acc, achievement) => {
          return acc + (achievement.achieved == 1 ? 1 : 0);
        }, 0);
        const total = game.playerAchievements.length;
        newGame = {
          ...game,
          completed,
          total,
          percentage:
            completed === 0 ? 0 : Math.ceil((completed / total) * 100),
        };
        return newGame;
      });
      console.log('MAIN GAMES', completionAddedGames);
      setGames((old) => completionAddedGames);
    };

    getGames();
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      setSelectedGame((old) => games[0]);
      setLoading((old) => false);
    }
  }, [games]);

  const openRightSidebar = (data) => {
    setShowRightSidebar((old) => true);
    setSelectedGame((old) => data);
  };

  const closeRightSidebar = () => {
    setShowRightSidebar((old) => false);
  };

  const searchTextChanged = (searchTerm) => {
    setSearchTerm((old) => searchTerm);
  };

  const onGameInitialChanged = (game) => {
    setSelectedGame((old) => game);
  };

  const onFilterChanged = (filterOption) => {
    switch (filterOption) {
      case GAMES_SORT_COMPLETION_DESC:
        setFilterOption((old) => GAMES_SORT_COMPLETION_DESC);
        break;
      case GAMES_SORT_COMPLETION_ASC:
        setFilterOption((old) => GAMES_SORT_COMPLETION_ASC);
        setGames((old) => old.map((game) => game));
        break;
      default:
        break;
    }
  };

  const [loading, setLoading] = useState(true);

  const onLoadingComplete = () => {
    setLoading((old) => false);
  };

  return (
    <Page
      showRightSidebar={showRightSidebar}
      leftSidebar={<GamesLeftSidebar />}
      rightSidebar={
        !loading && (
          <GamesRightSidebar
            selectedGame={selectedGame}
            achievementDisplayOption={achievementDisplayOption}
          />
        )
      }
      header={
        !loading && (
          <GamesHeader
            filterOptions={filterOptions}
            searchTextChanged={searchTextChanged}
            onFilterChanged={onFilterChanged}
          />
        )
      }
      content={
        !loading ? (
          <GamesContent
            gamesDisplayOption={gamesDisplayOption}
            searchTerm={searchTerm}
            filterOption={filterOption}
            games={games}
            openRightSidebar={openRightSidebar}
            closeRightSidebar={closeRightSidebar}
            onGameInitialChanged={onGameInitialChanged}
          />
        ) : (
          <Loader />
        )
      }
    />
  );
}
