import { formatAchievments } from '../../../../helper/achievementHelper';
import { READ_JSON } from '../../../../helper/fileHelper';
import { calculateXPFromPercentage } from '../../../../helper/xpHelper';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { gameId } = req.query;
    READ_JSON()
      .then((data) => {
        const games = data.games;
        const game = games.find((game) => game.appid == gameId);

        let newGame = {};
        const completed = game.playerAchievements.reduce((acc, achievement) => {
          return acc + (achievement.achieved == 1 ? 1 : 0);
        }, 0);
        const total = game.playerAchievements.length;
        newGame = {
          ...game,
          completed,
          total,
          percentage:
            completed === 0 ? 0 : Math.ceil((completed / total) * 100),
        };
        const { schemaAchievements, playerAchievements, globalAchievements } =
          newGame;
        const formattedAchievements = formatAchievments(
          schemaAchievements,
          globalAchievements,
          playerAchievements
        );
        let completedXP = 0;
        let remainingXP = 0;
        formattedAchievements.forEach((achievement) => {
          if (achievement.achieved == 0) {
            remainingXP += calculateXPFromPercentage(achievement.percent);
          }
          if (achievement.achieved == 1) {
            completedXP += calculateXPFromPercentage(achievement.percent);
          }
        });
        res.status(200).json({
          status: 'success',
          XPInfo: {
            totalXP: remainingXP + completedXP,
            remainingXP,
            completedXP,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
