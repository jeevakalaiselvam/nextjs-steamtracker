import React from 'react';
import styled from 'styled-components';
import MenuItem from '../ui/atoms/MenuItem';
import { HiViewGrid } from 'react-icons/hi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GamesMenu = (props) => {
  return (
    <Container>
      <MenuItem title="All Games" icon={<HiViewGrid />} />
    </Container>
  );
};

export default GamesMenu;
