import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GameCard from "../ui/molecules/GameCard";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const GamesContent = (props) => {
  const { games, openRightSidebar, closeRightSidebar } = props;
  return (
    <Container>
      {/* {games.length > 0 &&
        games.map((game) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              openRightSidebar={openRightSidebar}
              closeRightSidebar={closeRightSidebar}
            />
          );
        })} */}
      GAMES LIST
    </Container>
  );
};

export default GamesContent;
