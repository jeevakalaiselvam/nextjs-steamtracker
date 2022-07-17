import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GAME_SETTING_DISPLAY_HOVER,
  GAME_SETTING_DISPLAY_PERCENTAGE,
  GAME_SETTING_DISPLAY_VISIBLE,
  getGamesFiltered,
} from '../../helper/filterHelper';
import GameCardHover from '../ui/molecules/GameCardHover';
import GameCardPercentage from '../ui/molecules/GameCardPercentage';
import GameCardVisible from '../ui/molecules/GameCardVisible';

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
    gamesDisplayOption,
  } = props;
  console.log('GAMES', games);

  const [searchFilteredGames, setSearchFilteredGames] = useState(games);

  useEffect(() => {
    if (games.length > 0) {
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

  return (
    <Container>
      {searchFilteredGames.length > 0 &&
        searchFilteredGames.map((game) => {
          return (
            <React.Fragment key={game.appid}>
              {gamesDisplayOption === GAME_SETTING_DISPLAY_VISIBLE && (
                <GameCardVisible
                  gamesDisplayOption={gamesDisplayOption}
                  searchTerm={searchTerm}
                  key={game.appid}
                  game={game}
                  openRightSidebar={openRightSidebar}
                  closeRightSidebar={closeRightSidebar}
                />
              )}
              {gamesDisplayOption === GAME_SETTING_DISPLAY_HOVER && (
                <GameCardHover
                  gamesDisplayOption={gamesDisplayOption}
                  searchTerm={searchTerm}
                  key={game.appid}
                  game={game}
                  openRightSidebar={openRightSidebar}
                  closeRightSidebar={closeRightSidebar}
                />
              )}
              {gamesDisplayOption === GAME_SETTING_DISPLAY_PERCENTAGE && (
                <GameCardPercentage
                  gamesDisplayOption={gamesDisplayOption}
                  searchTerm={searchTerm}
                  key={game.appid}
                  game={game}
                  openRightSidebar={openRightSidebar}
                  closeRightSidebar={closeRightSidebar}
                />
              )}
            </React.Fragment>
          );
        })}
    </Container>
  );
};

export default GamesContent;
