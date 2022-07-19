import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.active ? '#1e33a6' : 'rgba(0, 0, 0, 0.5)'};
  width: 25px;
  height: 25px;
  color: ${(props) => (props.active ? '#fefefe' : '#61626d')};
  justify-content: center;
  &:hover {
    background-color: #1e33a6;
    color: #fefefe;
  }
`;

export default function PhaseButton(props) {
  const { phase, icon, phaseKey, active, refreshList } = props;

  return (
    <Container
      active={active}
      onClick={() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(phaseKey, phase);
          refreshList();
        }
      }}
    >
      {phase}
    </Container>
  );
}
