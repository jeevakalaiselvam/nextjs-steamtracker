import axios from 'axios';

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

export const formatAchievmentsByNotUnlockedEasyPercentage = (achievements) => {
  let filteredByNotUnlocked = [];
  let sortedByEasy = [];
  if (achievements && achievements.length > 0) {
    sortedByEasy = achievements.sort((achievement1, achievement2) => {
      return +achievement1.percentage < +achievement2.percentage;
    });
    filteredByNotUnlocked = sortedByEasy.filter((achievement) => {
      return achievement.achieved == 0;
    });
  }
  return filteredByNotUnlocked;
};

export const formatAchievmentsByUnlockedRecent = (achievements) => {
  let filteredByUnlockedRecent = [];
  if (achievements && achievements.length > 0) {
    if (achievements && achievements.length > 0) {
      filteredByUnlockedRecent = achievements.sort(
        (achievement1, achievement2) => {
          return +achievement1.unlockedtime < +achievement2.unlockedtime;
        }
      );
    }
  }
  return filteredByUnlockedRecent;
};

export const getHiddenDescriptionForName = (name, achievements) => {
  let hiddenAchievement = '';
  if (achievements && achievements.length > 0) {
    const hiddenAchievementObject = achievements.find((achievement) => {
      console.log(
        'CHECKING',
        achievement.name.toLowerCase(),
        name.toLowerCase()
      );
      return achievement.name.toLowerCase() == name.toLowerCase();
    });

    hiddenAchievement = hiddenAchievementObject?.description || '';
  }

  return hiddenAchievement;
};
