import React from 'react';
import styled from 'styled-components';
import { HEADER_IMAGE } from '../../helper/urlHelper';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Image = styled.div`
  display: 'flex';
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 300px;
  height: 150px;
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
  bottom: 0px;
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

const GamesRightSidebar = (props) => {
  const { selectedGame, showRightSidebar } = props;
  const { appid, gameName } = selectedGame;
  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Image image={HEADER_IMAGE(appid)}>
        <Overlay></Overlay>
        <Title>{gameName}</Title>
      </Image>
    </Container>
  );
};

export default GamesRightSidebar;
