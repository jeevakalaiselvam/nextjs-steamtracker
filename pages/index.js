import Page from '../layouts/Page';
import GamesContent from '../components/content/GamesContent';
import GamesLeftSidebar from '../components/leftsidebar/GamesLeftSidebar';
import GamesRightSidebar from '../components/rightsidebar/GamesRightSidebar';
import GamesHeader from '../components/header/GamesHeader';
import { useEffect, useState } from 'react';
import { API_GET_GAMES } from '../helper/apiHelper';
import axios from 'axios';
import {
  GAMES_SORT_COMPLETION_ASC,
  GAMES_SORT_COMPLETION_DESC,
} from '../helper/filterHelper';
import RefreshContent from '../components/content/RefreshContent';

export default function Home() {
  return <Page content={<RefreshContent />} />;
}
