import React from 'react';
import styled from 'styled-components';
import { HEADER_IMAGE } from '../../helper/urlHelper';
import { HiCheckCircle } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { formatAchievments } from '../../helper/achievementHelper';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Stat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CompletionContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ToGetIcon = styled.div`
  padding: 1rem 2rem;
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
  const {
    appid,
    gameName,
    total,
    completed,
    percentage,
    schemaAchievements,
    playerAchievements,
    globalAchievements,
  } = selectedGame;

  const formattedAchievements = formatAchievments(
    schemaAchievements,
    globalAchievements,
    playerAchievements
  );
  console.log('FORMATTED ACHIEVEMENETS', formattedAchievements);

  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Header>
        <Stat>
          <CompletionContainer>
            <CompletionIcon>
              <HiCheckCircle />
            </CompletionIcon>
            <CompletionData>{percentage}</CompletionData>
          </CompletionContainer>
          <Image image={HEADER_IMAGE(appid)}>
            <Overlay></Overlay>
            <Title>{gameName}</Title>
          </Image>
          <ToGetContainer>
            <ToGetIcon>
              <FaTrophy />
            </ToGetIcon>
            <ToGetData>{total - completed}</ToGetData>
          </ToGetContainer>
        </Stat>
      </Header>
    </Container>
  );
};

export default GamesRightSidebar;
