import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_GET_GAME } from '../../../helper/apiHelper';
import { HEADER_IMAGE } from '../../../helper/urlHelper';
import { HiChartPie } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { GAME_SETTING_DISPLAY_VISIBLE } from '../../../helper/filterHelper';

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

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const ToGetCompletionMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateY(${(props) => (props.showIcons ? '0%' : '-100%')});
  transition: all 0.3s;
`;

const CompletionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 4rem;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: 2rem;
`;

const CompletionIcon = styled.div`
  display: flex;
  align-items: center;
  color: #3470d2;
  font-size: 4rem;
  justify-content: center;
`;

const CompletionData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #3470d2;
`;

export default function GameCardPercentage(props) {
  const { openRightSidebar, closeRightSidebar, game, gamesDisplayOption } =
    props;
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
      }}
    >
      <Overlay></Overlay>
      <Title>{gameName}</Title>
      <ToGetCompletionMainContainer showIcons={showIcons}>
        <CompletionContainer>
          <CompletionIcon>
            <HiChartPie />
          </CompletionIcon>
          <CompletionData>{percentage}</CompletionData>
        </CompletionContainer>
        <ToGetContainer>
          <ToGetIcon>
            <FaTrophy />
          </ToGetIcon>
          <ToGetData>{total - completed}</ToGetData>
        </ToGetContainer>
      </ToGetCompletionMainContainer>
    </Container>
  );
}
