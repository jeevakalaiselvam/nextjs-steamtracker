import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiCheckCircle } from 'react-icons/hi';
import axios from 'axios';
import { FaTrophy } from 'react-icons/fa';
import { HiGlobe } from 'react-icons/hi';
import { calculateXPFromPercentage } from '../../../helper/xpHelper';
import PhaseButton from './PhaseButton';

const Container = styled.div`
  display: ${(props) => (props.shouldShow ? 'flex' : 'none')};
  flex-direction: row;
  align-items: ${(props) => (props.alignTop ? 'flex-start' : 'flex-start')};
  justify-content: center;
  min-width: 100%;
  min-height: ${(props) => (props.alignTop ? '130px' : '110px')};
  background-color: ${(props) =>
    props.background ? props.background : '#1e1e1e'};
  border-radius: 4px;
  padding: ${(props) => (props.padding ? props.padding : '0rem')};
  margin: ${(props) => (props.margin ? props.margin : '0rem')};
  cursor: pointer;
  position: relative;
  opacity: ${(props) =>
    props.achieved && props.disableOpacityTrigger ? '0.3' : '1'};
`;

const IconXPContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const XP = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 1rem;
  color: #737c9d;
  padding: 0.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
`;

const TitleDescContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  min-height: 70px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #eeeeee;
  padding: 0rem 1rem;
  justify-content: flex-start;
  font-size: 1.55rem;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem 1rem;
  color: #6c6c6e;
  width: 100%;
  flex: 1;
  font-size: 1.5rem;
  font-weight: 300;
`;

const CompletedIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: gold;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 4px 0 4px;
`;

const PercentageContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fefefe;
  padding: 0.5rem;
  border-radius: 0 4px 0 4px;
`;

const PercentageIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5 0.5rem 0.5rem 0rem;
  font-size: 2rem;
  font-weight: 300;
  color: #737c9d;
`;
const PercentageText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #737c9d;
  font-weight: 300;
`;

const PhaseButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  width: 150px;
  padding: 0.5rem;
  transform: translate(-50%);
  bottom: 0;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-evenly;
`;

const AchievementNormal = (props) => {
  const {
    achievement,
    hiddenAchievementDesc,
    background,
    gameName,
    clickSearch,
    padding,
    margin,
    disableOpacityTrigger,
    phase,
    gameId,
    phaseActivateShow,
    refreshList,
  } = props;

  const {
    name,
    displayName,
    description,
    icon,
    icongray,
    achieved,
    apiname,
    hidden,
    percent,
    unlocktime,
  } = achievement;

  let whichPhaseIsAchievement = '1';
  if (typeof window !== 'undefined') {
    whichPhaseIsAchievement =
      localStorage.getItem(`${gameId}_${apiname}_PHASE`) || '1';
  }

  return (
    <Container
      alignTop={phaseActivateShow}
      shouldShow={phaseActivateShow ? whichPhaseIsAchievement == phase : true}
      disableOpacityTrigger={disableOpacityTrigger}
      achieved={achieved}
      margin={margin}
      padding={padding}
      background={background}
      onClick={() => {
        if (clickSearch) {
          if (window !== 'undefined') {
            const searchQuery = `${displayName} ${gameName} achievement`;
            window.open(`https://www.google.com/search?q=${searchQuery}`);
          }
        }
      }}
    >
      <PhaseButtonContainer show={phaseActivateShow}>
        <PhaseButton
          phase={1}
          active={whichPhaseIsAchievement == 1}
          phaseKey={`${gameId}_${apiname}_PHASE`}
          refreshList={refreshList}
        />
        <PhaseButton
          phase={2}
          active={whichPhaseIsAchievement == 2}
          phaseKey={`${gameId}_${apiname}_PHASE`}
          refreshList={refreshList}
        />
        <PhaseButton
          phase={3}
          active={whichPhaseIsAchievement == 3}
          phaseKey={`${gameId}_${apiname}_PHASE`}
          refreshList={refreshList}
        />
        <PhaseButton
          phase={4}
          active={whichPhaseIsAchievement == 4}
          phaseKey={`${gameId}_${apiname}_PHASE`}
          refreshList={refreshList}
        />
        <PhaseButton
          phase={5}
          active={whichPhaseIsAchievement == 5}
          phaseKey={`${gameId}_${apiname}_PHASE`}
          refreshList={refreshList}
        />
      </PhaseButtonContainer>
      <XP>{calculateXPFromPercentage(percent)} XP</XP>
      <PercentageContainer>
        <PercentageIcon>
          <HiGlobe />
        </PercentageIcon>
        <PercentageText>{Math.floor(percent)} %</PercentageText>
      </PercentageContainer>
      <IconXPContainer>
        <IconContainer image={icon}>
          {achieved == 1 && (
            <CompletedIcon>
              <HiCheckCircle />
            </CompletedIcon>
          )}
        </IconContainer>
      </IconXPContainer>
      <TitleDescContainer>
        <Title>{displayName}</Title>
        <Description>{hiddenAchievementDesc || description || ''}</Description>
      </TitleDescContainer>
    </Container>
  );
};

export default AchievementNormal;
