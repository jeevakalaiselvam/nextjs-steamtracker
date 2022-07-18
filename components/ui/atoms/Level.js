import React from 'react';
import styled from 'styled-components';
import { XP_FOR_LEVEL } from '../../../helper/xpHelper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
`;

const ProgressContainer = styled.div`
  display: none;
  align-items: center;
  width: 100px;
  padding: 1rem;
  height: 100px;
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
    </Container>
  );
}
