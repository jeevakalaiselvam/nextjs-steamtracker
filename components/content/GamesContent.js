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
  const { games, openRightSidebar, closeRightSidebar, searchTerm } = props;
  return (
    <Container>
      {games.length > 0 &&
        games.map((game) => {
          return (
            <GameCard
              searchTerm={searchTerm}
              key={game.id}
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
