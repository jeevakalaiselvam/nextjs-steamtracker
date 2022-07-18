import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL,
  GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL,
  GAME_JOURNAL_FONT_SETTING_LARGE,
  GAME_JOURNAL_FONT_SETTING_MEDIUM,
  GAME_JOURNAL_FONT_SETTING_SMALL,
  LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY,
  LOCALSTORAGE_JOURNAL_SETTING_FONT,
} from '../../helper/filterHelper';
import Filter from '../ui/atoms/Filter';
import SettingItem from '../ui/atoms/SettingItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const AchievementSidebarSettings = (props) => {
  const filterOptions = [
    {
      id: GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL,
      title: 'Normal',
    },
    {
      id: GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL,
      title: 'Small',
    },
  ];

  const journalFontOptions = [
    {
      id: GAME_JOURNAL_FONT_SETTING_SMALL,
      title: 'Small',
    },
    {
      id: GAME_JOURNAL_FONT_SETTING_MEDIUM,
      title: 'Medium',
    },
    {
      id: GAME_JOURNAL_FONT_SETTING_LARGE,
      title: 'Large',
    },
  ];

  const displayFilterChanged = (filterOption) => {
    if (window !== 'undefined') {
      localStorage.setItem(
        LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY,
        filterOption
      );
      setDefaultSelected((old) => filterOption);
    }
  };

  const journalFontChanged = (filterOption) => {
    if (window !== 'undefined') {
      localStorage.setItem(LOCALSTORAGE_JOURNAL_SETTING_FONT, filterOption);
      setDefaultFontSelected((old) => filterOption);
    }
  };

  let selected;
  if (window !== 'undefined') {
    selected = localStorage.getItem(
      LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY
    );
  }

  let fontSelected;
  if (window !== 'undefined') {
    fontSelected = localStorage.getItem(LOCALSTORAGE_JOURNAL_SETTING_FONT);
  }
  const [defaultSelected, setDefaultSelected] = useState(selected);
  const [defaultFontSelected, setDefaultFontSelected] = useState(fontSelected);

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
      <SettingItem
        title="Journal Font"
        component={
          <Filter
            defaultSelected={defaultFontSelected}
            background={'#1e1e1e'}
            filterOptions={journalFontOptions}
            onFilterChanged={journalFontChanged}
          />
        }
      />
    </Container>
  );
};

export default AchievementSidebarSettings;
