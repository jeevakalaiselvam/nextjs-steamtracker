import React from 'react';
import styled from 'styled-components';
import Profile from '../ui/molecules/Profile';
import MenuItem from '../ui/atoms/MenuItem';
import { HiViewGrid, HiAdjustments, HiRefresh } from 'react-icons/hi';
import SubMenu from '../ui/atoms/SubMenu';
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GamesMenu = (props) => {
  const router = useRouter();

  return (
    <Container>
      <Profile />
      <SubMenu title="Main" />
      <MenuItem
        title="Games"
        icon={<HiViewGrid />}
        onClick={() => {
          router.push('/games');
        }}
      />
      <MenuItem
        title="Settings"
        icon={<HiAdjustments />}
        onClick={() => {
          router.push('/settings');
        }}
      />
      <MenuItem
        title="Refresh"
        icon={<HiRefresh />}
        onClick={() => {
          router.push('/');
        }}
      />
    </Container>
  );
};

export default GamesMenu;
