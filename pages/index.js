import Page from '../layouts/Page';
import GamesContent from '../components/content/GamesContent';
import GamesLeftSidebar from '../components/leftsidebar/GamesLeftSidebar';
import GamesRightSidebar from '../components/rightsidebar/GamesRightSidebar';
import GamesHeader from '../components/header/GamesHeader';

export default function Home() {
  return (
    <Page
      leftSidebar={<GamesLeftSidebar />}
      rightSidebar={<GamesRightSidebar />}
      header={<GamesHeader />}
      content={<GamesContent />}
    />
  );
}
