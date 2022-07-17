import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #171717;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
`;

const AchievementNormal = (props) => {
  const { achievement } = props;
  const { name } = achievement;
  return <Container>Achievement</Container>;
};

export default AchievementNormal;
