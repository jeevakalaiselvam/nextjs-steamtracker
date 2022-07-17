import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import * as Loaders from 'react-spinners';
import styled from 'styled-components';
import { API_REFRESH_DATA } from '../../helper/apiHelper';
import GameSettings from '../settings/GameSettings';
import SubMenu from '../ui/atoms/SubMenu';
import SettingCard from '../ui/molecules/SettingCard';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const SettingsContent = (props) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <Container>
      <SettingCard
        title="Game Page"
        component={<GameSettings />}
        navigateTo={'/games'}
      />
      <SettingCard title="Achievements Page " />
      <SettingCard title="Achievement Sidebar" />
    </Container>
  );
};

export default SettingsContent;
