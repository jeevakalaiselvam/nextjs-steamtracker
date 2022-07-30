import { formatAchievments } from "./achievementHelper";

export const XP_FOR_LEVEL = 1000;

export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 5) {
    return 500;
  } else if (percentage <= 10 && percentage > 5) {
    return 250;
  } else if (percentage <= 25 && percentage > 10) {
    return 100;
  } else if (percentage <= 50 && percentage > 25) {
    return 75;
  } else if (percentage <= 75 && percentage > 50) {
    return 50;
  } else {
    return 25;
  }
};

export const totalXPForGames = (games) => {
  let totalXP = 0;

  if (games && games.length > 0) {
    games.forEach((game) => {
      const {
        appid,
        completed,
        gameName,
        globalAchievements,
        playerAchievements,
        schemaAchievements,
        percentage,
        total,
      } = game;

      const formattedAchivements = formatAchievments(
        schemaAchievements,
        globalAchievements,
        playerAchievements
      );

      formattedAchivements.forEach((achievement) => {
        const {
          name,
          displayName,
          description,
          icon,
          icongray,
          achieved,
          apiname,
          hidden,
          percent,
          unlocktime,
        } = achievement;

        totalXP += achieved == 1 ? calculateXPFromPercentage(percent) : 0;
      });
    });
  }

  return totalXP;
};

export const getRemainingXP = (achievements) => {
  let remainingXP = 0;
  achievements.forEach((achievement) => {
    if (achievement.achieved == 0) {
      remainingXP =
        remainingXP + +calculateXPFromPercentage(achievement.percent);
    }
  });
  return remainingXP;
};
