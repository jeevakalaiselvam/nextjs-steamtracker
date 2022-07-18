import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_GET_GAME } from '../../../helper/apiHelper';
import { HEADER_IMAGE } from '../../../helper/urlHelper';
import { HiClock } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { GAME_SETTING_DISPLAY_VISIBLE } from '../../../helper/filterHelper';
import axios from 'axios';
import { LOCALSTORAGE_GAME_SELECTED } from '../../../helper/storageHelper';

const Container = styled.div`
  display: 'flex';
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 300px;
  height: 140px;
  margin: 0.5rem;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.85);
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fefefe;
  left: 0px;
  width: 100%;
  padding: 0.5rem 1rem;
  max-height: 30px;
`;

const CompletionContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 1rem;
  left: 0;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX(${(props) => (props.showIcons ? '0%' : '-100%')});
`;

const ToGetContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX(${(props) => (props.showIcons ? '0%' : '100%')});
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 2.25rem;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: 1.25rem;
`;

const CompletionIcon = styled.div`
  display: flex;
  align-items: center;
  color: #3470d2;
  font-size: 2.25rem;
  justify-content: center;
`;

const CompletionData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #3470d2;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #f5b81c;
`;

const CompletionTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GameCardHover(props) {
  const {
    openRightSidebar,
    closeRightSidebar,
    game,
    gamesDisplayOption,
    onGameInitialChanged,
  } = props;
  const { appid, gameName, completed, total, percentage } = game;

  const [showIcons, setShowIcons] = useState(false);

  return (
    <Container
      image={HEADER_IMAGE(appid)}
      onMouseEnter={() => {
        setShowIcons((old) => true);
      }}
      onMouseLeave={() => {
        setShowIcons((old) => false);
      }}
      onClick={() => {
        openRightSidebar(game);
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            LOCALSTORAGE_GAME_SELECTED,
            JSON.stringify(game)
          );
          onGameInitialChanged(game);
        }
      }}
    >
      <Overlay>{completed == total && <FaTrophy />}</Overlay>
      <Title>{gameName}</Title>
      <ToGetContainer showIcons={showIcons}>
        <ToGetIcon>
          <FaTrophy />
        </ToGetIcon>
        <ToGetData>{total - completed}</ToGetData>
      </ToGetContainer>
      <CompletionContainer showIcons={showIcons}>
        <CompletionIcon>
          <HiClock />
        </CompletionIcon>
        <CompletionData>{percentage}</CompletionData>
      </CompletionContainer>
    </Container>
  );
}
