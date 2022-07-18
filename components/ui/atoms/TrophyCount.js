import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 33%;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 3rem;
  align-items: center;
  color: ${(props) => props.iconColor};
  justify-content: center;
`;
const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.iconColor};
  font-size: 2rem;
  justify-content: center;
`;

export default function TrophyCount(props) {
  const { icon, count, iconColor } = props;
  return (
    <Container>
      <IconContainer iconColor={iconColor}>{icon}</IconContainer>
      <CountContainer iconColor={iconColor}>{count || 0}</CountContainer>
    </Container>
  );
}
