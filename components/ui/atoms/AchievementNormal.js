import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiCheckCircle } from 'react-icons/hi';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
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
  padding: 0rem 1rem;
  justify-content: flex-start;
  font-size: 1.5rem;
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
  font-size: 2rem;
  color: #fefefe;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 4px 0 4px;
`;

const AchievementNormal = (props) => {
  const { achievement, hiddenAchievementDesc } = props;

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
    <Container>
      <IconContainer image={icon}>
        {achieved == 1 && (
          <CompletedIcon>
            <HiCheckCircle />
          </CompletedIcon>
        )}
      </IconContainer>
      <TitleDescContainer>
        <Title>{displayName}</Title>
        <Description>{hiddenAchievementDesc || ''}</Description>
      </TitleDescContainer>
    </Container>
  );
};

export default AchievementNormal;
