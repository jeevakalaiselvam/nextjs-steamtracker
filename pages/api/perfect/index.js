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
        let gold = 0,
          purple = 0,
          silver = 0,
          bronze = 0;
        completionAddedGames.forEach((game) => {
          if (+game.percentage == 100) {
            gold++;
          } else if (+game.percentage < 100 && +game.percentage >= 75) {
            purple++;
          } else if (+game.percentage < 75 && +game.percentage >= 50) {
            silver++;
          } else if (+game.percentage < 50 && +game.percentage >= 25) {
            bronze++;
          }
        });
        res.status(200).json({
          status: 'success',
          perfectGames: {
            gold,
            purple,
            silver,
            bronze,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
