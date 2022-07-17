export const formatAchievments = (
  schemaAchievements,
  globalAchievements,
  playerAchievements
) => {
  let formattedAchievementsArray = [];
  let formattedAchievements = {};

  if (schemaAchievements && schemaAchievements.length > 0) {
    schemaAchievements.forEach((schemaAchievement) => {
      formattedAchievements[schemaAchievement.name] = schemaAchievement;
    });
    globalAchievements.forEach((globalAchievement) => {
      formattedAchievements[globalAchievement.name] = {
        ...formattedAchievements[globalAchievement.name],
        ...globalAchievement,
      };
    });
    playerAchievements.forEach((playerAchievement) => {
      formattedAchievements[playerAchievement.apiname] = {
        ...formattedAchievements[playerAchievement.apiname],
        ...playerAchievement,
      };
    });

    formattedAchievementsArray = Object.keys(formattedAchievements).map(
      (key) => formattedAchievements[key]
    );
  }
  return formattedAchievementsArray;
};

export const formatAchievmentsByRecentUnlocked = (achievements) => {
  let sortedByRecent = [];
  if (achievements && achievements.length > 0) {
    sortedByRecent = achievements.sort((achievement1, achievement2) => {
      return +achievement1.unlocktime < +achievement2.unlocktime;
    });
  }
  return sortedByRecent;
};
