import { READ_JSON } from '../../../helper/fileHelper';
import { totalXPForGames } from '../../../helper/xpHelper';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    READ_JSON()
      .then((data) => {
        const games = data.games;
        const completionAddedGames = games.map((game) => {
          let newGame = {};
          const completed = game.playerAchievements.reduce(
            (acc, achievement) => {
              return acc + (achievement.achieved == 1 ? 1 : 0);
            },
            0
          );
          const total = game.playerAchievements.length;
          newGame = {
            ...game,
            completed,
            total,
            percentage:
              completed === 0 ? 0 : Math.ceil((completed / total) * 100),
          };
          return newGame;
        });
        const totalXP = totalXPForGames(completionAddedGames);
        res.status(200).json({ status: 'success', totalXP: totalXP });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
