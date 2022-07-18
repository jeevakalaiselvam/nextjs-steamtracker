import React from 'react';
import styled from 'styled-components';
import { XP_FOR_LEVEL } from '../../../helper/xpHelper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiChevronDoubleUp } from 'react-icons/hi';
import SubMenu from './SubMenu';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #f5b81c;
  font-weight: 300;
`;

const MoreNeeded = styled.div`
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin: 1rem 0rem;
  color: #fefefe;
  background-color: #3049d1;
  font-size: 1.5rem;
`;

const ProgressContainer = styled.div`
  display: none;
  align-items: center;
  width: 100px;
  padding: 1rem;
  height: 100px;
  justify-content: center;
`;

const MoreData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoreIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  justify-content: center;
`;

export default function Level(props) {
  const { totalXP } = props;
  const percentage = ((totalXP % XP_FOR_LEVEL) / 1000) * 100;
  return (
    <Container>
      <ProgressContainer>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0,
            strokeLinecap: 'butt',
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: `#3049d1`,
            textColor: '#f88',
            trailColor: '#fefefe',
            backgroundColor: '#3049d1',
          })}
        />
      </ProgressContainer>
      <LevelContainer>
        LEVEL {Math.floor(totalXP / XP_FOR_LEVEL)}
      </LevelContainer>
      <MoreNeeded>{XP_FOR_LEVEL - (totalXP % XP_FOR_LEVEL)} XP</MoreNeeded>
    </Container>
  );
}
