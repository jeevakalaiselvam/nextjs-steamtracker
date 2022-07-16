import Page from '../layouts/Page';
import GamesContent from '../components/content/GamesContent';
import GamesLeftSidebar from '../components/leftsidebar/GamesLeftSidebar';
import GamesRightSidebar from '../components/rightsidebar/GamesRightSidebar';
import GamesHeader from '../components/header/GamesHeader';
import { useEffect, useState } from 'react';
import { API_GET_GAMES } from '../helper/apiHelper';
import axios from 'axios';

export default function Home() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get(API_GET_GAMES());
      setGames((old) => response.data.games);
    };

    getGames();
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      setSelectedGame((old) => games[0]);
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

  return (
    <Page
      showRightSidebar={showRightSidebar}
      leftSidebar={<GamesLeftSidebar />}
      rightSidebar={<GamesRightSidebar selectedGame={selectedGame} />}
      header={<GamesHeader searchTextChanged={searchTextChanged} />}
      content={
        <GamesContent
          searchTerm={searchTerm}
          games={games}
          openRightSidebar={openRightSidebar}
          closeRightSidebar={closeRightSidebar}
        />
      }
    />
  );
}
