import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiCheck } from 'react-icons/hi';
import axios from 'axios';
import { FaTrophy } from 'react-icons/fa';
import { HiGlobe } from 'react-icons/hi';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  background-color: ${(props) =>
    props.background ? props.background : '#1e1e1e'};
  border-radius: 4px;
  margin: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
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
  font-size: 2rem;
  overflow: visible;
  color: #fefefe;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 4px 0 4px;
`;

const AchievementSmall = (props) => {
  const {
    achievement,
    hiddenAchievementDesc,
    background,
    gameName,
    onMouseEnter,
    onMouseLeave,
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

  return (
    <Container
      background={background}
      onMouseLeave={() => {
        onMouseLeave({ ...achievement, hiddenAchievementDesc });
      }}
      onMouseEnter={() => {
        onMouseEnter({ ...achievement, hiddenAchievementDesc });
      }}
      onClick={() => {
        if (window !== 'undefined') {
          const searchQuery = `${displayName} ${gameName} achievement`;
          window.open(`https://www.google.com/search?q=${searchQuery}`);
        }
      }}
    >
      <IconContainer image={icon}>
        {achieved == 1 && (
          <CompletedIcon>
            <HiCheck />
          </CompletedIcon>
        )}
      </IconContainer>
    </Container>
  );
};

export default AchievementSmall;
