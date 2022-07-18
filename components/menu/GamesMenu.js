import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from '../ui/molecules/Profile';
import MenuItem from '../ui/atoms/MenuItem';
import { HiViewGrid, HiAdjustments, HiRefresh } from 'react-icons/hi';
import SubMenu from '../ui/atoms/SubMenu';
import { useRouter } from 'next/router';
import Level from '../ui/atoms/Level';
import axios from 'axios';
import { API_TOTAL_XP } from '../../helper/apiHelper';
import GameXPStat from '../ui/atoms/GameXPStat';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GameStatContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GamesMenu = (props) => {
  const router = useRouter();
  const { XPData } = props;
  const { totalXP: totalXPGame, remainingXP, completedXP } = XPData || {};
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const getTotalXP = async () => {
      const response = await axios.get(API_TOTAL_XP());
      const data = response.data;
      setTotalXP((old) => data.totalXP);
    };
    getTotalXP();
  }, []);

  return (
    <Container>
      <Profile />
      <Level totalXP={totalXP} />
      <SubMenu title="Menu" />
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
      {totalXPGame && (
        <GameStatContainer>
          <GameXPStat
            totalXP={totalXP}
            completedXP={completedXP}
            remainingXP={remainingXP}
          />
        </GameStatContainer>
      )}
    </Container>
  );
};

export default GamesMenu;
