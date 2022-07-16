import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGamesFiltered } from '../../helper/filterHelper';
import GameCard from '../ui/molecules/GameCard';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: scroll;
`;

const GamesContent = (props) => {
  const {
    games,
    openRightSidebar,
    closeRightSidebar,
    searchTerm,
    filterOption,
  } = props;
  console.log('GAMES', games);

  const [searchFilteredGames, setSearchFilteredGames] = useState(games);

  useEffect(() => {
    if (games.length > 0) {
      console.log('---------FILTERING------------');
      const filteredGames = getGamesFiltered(games, filterOption);
      const searchFilteredGames = filteredGames.filter((game) => {
        if (game.gameName.toLowerCase().includes(searchTerm)) {
          return true;
        } else {
          return false;
        }
      });
      setSearchFilteredGames((old) => searchFilteredGames);
    }
  }, [games, searchTerm, filterOption]);

  // useEffect(() => {
  //   setSearchFilteredGames((old) => games);
  // }, [games,searchTerm,filterOption]);

  return (
    <Container>
      {searchFilteredGames.length > 0 &&
        searchFilteredGames.map((game) => {
          return (
            <GameCard
              searchTerm={searchTerm}
              key={game.appid}
              game={game}
              openRightSidebar={openRightSidebar}
              closeRightSidebar={closeRightSidebar}
            />
          );
        })}
    </Container>
  );
};

export default GamesContent;
