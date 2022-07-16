import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/molecules/Profile';
import MenuItem from '../ui/atoms/MenuItem';
import { HiViewGrid } from 'react-icons/hi';
import SubMenu from '../ui/atoms/SubMenu';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GamesMenu = (props) => {
  return (
    <Container>
      <Profile />
      <SubMenu title="Main" />
      <MenuItem title="All Games" icon={<HiViewGrid />} />
    </Container>
  );
};

export default GamesMenu;
