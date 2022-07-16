import {
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
  FETCH_ALL_GAMES,
} from '../../../helper/urlHelper';
import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    let newGames = [];

    axios
      .get(FETCH_ALL_GAMES)
      .then((response) => {
        const games = response.data.response.games;
        console.log(games);
        Promise.all(
          games.map(async (game) => {
            const achievementsResponse = await axios.get(
              FETCH_ALL_ACHIEVEMENTS_SCHEMA(game.appid)
            );
            const achievements = achievementsResponse.data;
            const newGame = {
              ...game,
              achievements:
                achievements.game.availableGameStats?.achievements || [],
              gameName: achievements.game.gameName,
            };
            return newGame;
          })
        )
          .then((data) => {
            const unfilteredGames = data;
            const filteredGamesOnlyWithAchievements = unfilteredGames.filter(
              (game) => game.achievements.length > 0
            );
            res
              .status(200)
              .json({
                status: 'success',
                games: filteredGamesOnlyWithAchievements,
              });
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ status: 'error', error: JSON.stringify(error) });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: 'error', error: JSON.stringify(error) });
      });
  }
};

export default handler;
