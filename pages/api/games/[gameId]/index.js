import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
  STEAM_ALL_ACHIEVEMENTS_PLAYER,
} from "../../../../helper/urlHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let newGame = {};
    const { gameId } = req.query;

    try {
      //Get All Schema Achievements
      const schemeAchievement = await fetch(
        FETCH_ALL_ACHIEVEMENTS_SCHEMA(gameId)
      );
      const schemeResponse = await schemeAchievement.json();
      newGame = {
        ...newGame,
        id: gameId,
        name: schemeResponse.game.gameName,
        version: schemeResponse.game.gameVersion,
        achievements:
          schemeResponse?.game?.availableGameStats?.achievements || [],
      };

      if (newGame.achievements.length) {
        //Get All Global Achievements
        const globalAchievementsResponse = await fetch(
          FETCH_ALL_ACHIEVEMENTS_GLOBAL(gameId)
        );
        const globalAchievementsData = await globalAchievementsResponse.json();
        const globalAchievements =
          globalAchievementsData.achievementpercentages.achievements;

        let newAchievements = newGame.achievements.map((achievement) => {
          const achievementFound = globalAchievements.find(
            (achievementInner) => {
              return achievementInner.name === achievement.name;
            }
          );
          const newAchievement = {
            ...achievement,
            percentage: achievementFound.percent,
          };
          return newAchievement;
        });
        newGame = {
          ...newGame,
          achievements: newAchievements,
        };

        //Add Player Achievement Progress
        const playerAchievementsResponse = await fetch(
          STEAM_ALL_ACHIEVEMENTS_PLAYER(gameId)
        );
        const playerAchievementData = await playerAchievementsResponse.json();
        const playerAchievements =
          playerAchievementData.playerstats.achievements;
        const gameName = playerAchievementData.playerstats.gameName;

        let newPlayerInnerAchievements = newGame.achievements.map(
          (achievement) => {
            const achievementFound = playerAchievements.find(
              (achievementInner) => {
                return achievementInner.apiname === achievement.name;
              }
            );
            const newAchievement = {
              ...achievement,
              achieved: achievementFound.achieved,
              unlocktime: achievementFound.unlocktime,
            };
            return newAchievement;
          }
        );
        const toGet =
          (newPlayerInnerAchievements &&
            newPlayerInnerAchievements.length > 0 &&
            newPlayerInnerAchievements.filter(
              (achievement) => achievement.achieved != "1"
            ).length) ||
          0;
        const completionPercentage =
          (newPlayerInnerAchievements &&
            newPlayerInnerAchievements.length > 0 &&
            100 -
              Math.floor((toGet / newPlayerInnerAchievements.length) * 100)) ||
          0;
        newGame = {
          ...newGame,
          name: gameName,
          achievements: newPlayerInnerAchievements,
          completion: completionPercentage,
          toGet: toGet,
        };

        res.status(200).json({ status: "success", game: newGame });
      } else {
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: JSON.stringify(error) });
    }
  }
};

export default handler;
