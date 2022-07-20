import { formatAchievments } from '../../../../helper/achievementHelper';
import { READ_JSON } from '../../../../helper/fileHelper';
import { totalXPForGames } from '../../../../helper/xpHelper';

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

        let date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - 2);
        const timeUTC = date.getTime() / 1000;

        let achievementsFilteredAchievedToday = [];
        completionAddedGames.forEach((game) => {
          const { playerAchievements, schemaAchievements, globalAchievements } =
            game;

          const formattedAchievements = formatAchievments(
            schemaAchievements,
            globalAchievements,
            playerAchievements
          );

          formattedAchievements.forEach((achievement) => {
            const { achieved, unlocktime } = achievement;
            console.log('CHECKING', unlocktime, timeUTC);
            if (achieved == 1 && +unlocktime > timeUTC) {
              console.log('YES');
              achievementsFilteredAchievedToday.push(achievement);
            }
          });
        });

        res.status(200).json({
          status: 'success',
          achievementsFilteredAchievedToday: achievementsFilteredAchievedToday,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
