import Page from '../layouts/Page';
import GamesContent from '../components/content/GamesContent';
import GamesSidebar from '../components/sidebar/GamesSidebar';
import GamesHeader from '../components/header/GamesHeader';

export default function Home() {
  return (
    <Page
      sidebar={<GamesSidebar />}
      header={<GamesHeader />}
      content={<GamesContent />}
    />
  );
}
