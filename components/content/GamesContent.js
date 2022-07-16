import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  const { games, openRightSidebar, closeRightSidebar, searchTerm } = props;
  console.log('GAMES', games);

  const [searchFilteredGames, setSearchFilteredGames] = useState(games);
  console.log('SEARCHFILTER GAMES', searchFilteredGames);

  useEffect(() => {
    // const newGames = games.filter((game) => {
    //   if (game.gameName.toLowerCase().contains(searchTerm)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // setSearchFilteredGames((old) => newGames);
  }, [searchTerm]);

  useEffect(() => {
    setSearchFilteredGames((old) => games);
  }, [games]);

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
