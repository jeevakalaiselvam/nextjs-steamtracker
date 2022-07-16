import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
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
        Promise.all(
          games.map(async (game) => {
            const achievementsResponse = await axios.get(
              FETCH_ALL_ACHIEVEMENTS_SCHEMA(game.appid)
            );
            const achievements = achievementsResponse.data;
            const newGame = {
              ...game,
              schemaAchievements:
                achievements.game.availableGameStats?.achievements || [],
              gameName: achievements.game.gameName,
            };
            return newGame;
          })
        ).then((data) => {
          const unfilteredGames = data;
          const filteredGamesOnlyWithAchievements = unfilteredGames.filter(
            (game) => game.schemaAchievements.length > 0
          );

          Promise.all(
            filteredGamesOnlyWithAchievements.map(async (game) => {
              const playerResponse = await axios.get(
                FETCH_ALL_ACHIEVEMENTS_PLAYER(game.appid)
              );
              const playerAchievements = playerResponse.data;
              const newGame = {
                ...game,
                playerAchievements: playerAchievements.playerstats.achievements,
              };
              return newGame;
            })
          ).then((allGames) => {
            res.status(200).json({
              status: 'success',
              games: allGames,
            });
          });
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: 'error', error: JSON.stringify(error) });
      });
  }
};

export default handler;
