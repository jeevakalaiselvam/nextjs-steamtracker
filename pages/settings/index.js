import React from 'react';
import SettingsContent from '../../components/content/SettingsContent';
import GamesLeftSidebar from '../../components/leftsidebar/GamesLeftSidebar';
import Page from '../../layouts/Page';

export default function Settings() {
  return (
    <Page content={<SettingsContent />} leftSidebar={<GamesLeftSidebar />} />
  );
}
