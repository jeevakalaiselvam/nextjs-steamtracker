import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GAME_SETTING_DISPLAY_HOVER,
  GAME_SETTING_DISPLAY_PERCENTAGE,
  GAME_SETTING_DISPLAY_VISIBLE,
  LOCALSTORAGE_GAME_SETTING_DISPLAY,
} from '../../helper/filterHelper';
import Filter from '../ui/atoms/Filter';
import SettingItem from '../ui/atoms/SettingItem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const GameSettings = (props) => {
  const filterOptions = [
    {
      id: GAME_SETTING_DISPLAY_VISIBLE,
      title: 'Visible',
    },
    {
      id: GAME_SETTING_DISPLAY_HOVER,
      title: 'Hover',
    },
    {
      id: GAME_SETTING_DISPLAY_PERCENTAGE,
      title: 'Percentage',
    },
  ];

  const displayFilterChanged = (filterOption) => {
    console.log('SETTINGS FILTER', filterOption);
    if (window !== 'undefined') {
      localStorage.setItem(LOCALSTORAGE_GAME_SETTING_DISPLAY, filterOption);
      setDefaultSelected((old) => filterOption);
    }
  };

  let selected;
  if (window !== 'undefined') {
    selected = localStorage.getItem(LOCALSTORAGE_GAME_SETTING_DISPLAY);
  }
  const [defaultSelected, setDefaultSelected] = useState(selected);

  return (
    <Container>
      <SettingItem
        title="Display Type"
        component={
          <Filter
            defaultSelected={defaultSelected}
            background={'#1e1e1e'}
            filterOptions={filterOptions}
            onFilterChanged={displayFilterChanged}
          />
        }
      />
    </Container>
  );
};

export default GameSettings;
