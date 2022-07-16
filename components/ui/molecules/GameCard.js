import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_GET_GAME } from '../../../helper/apiHelper';
import { HEADER_IMAGE } from '../../../helper/urlHelper';

const Container = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 300px;
  height: 150px;
  margin: 0.5rem;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9);
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fefefe;
  left: 0px;
  width: 100%;
  padding: 0.5rem 1rem;
  max-height: 30px;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export default function GameCard(props) {
  const { openRightSidebar, closeRightSidebar, searchTerm } = props;
  const { appid: id, gameName } = props.game;

  const [game, setGame] = useState({
    name: '',
  });

  const [show, setShow] = useState(true);

  useEffect(() => {
    openRightSidebar(game);
  }, [game]);

  useEffect(() => {
    const { name } = game;
    if (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === ''
    ) {
      setShow((old) => true);
    } else {
      setShow((old) => false);
    }
  }, [searchTerm]);

  return (
    <Container
      image={HEADER_IMAGE(id)}
      show={show}
      onClick={() => {
        const getGame = async () => {
          const response = await fetch(API_GET_GAME(id));
          const data = await response.json();
          if (data.status !== 'success') {
            setShow((old) => false);
          } else {
            setGame((old) => data.game);
          }
        };
        getGame();
      }}
    >
      <Overlay></Overlay>
      <Title>{gameName}</Title>
    </Container>
  );
}
