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

export const getDescForHiddenAchievements = async (achievement, gameId) => {
  const hiddenAchievements = await getHiddenInfoByCrawling(gameId);

  hiddenAchievements.map((achievementInner) => {
    if (
      achievementInner.name.toLowerCase().trim() ===
        achievement.name.toLowerCase().trim() &&
      achievement.hidden === 1
    ) {
      achievement.description = achievementInner.description;
    } else {
    }
  });

  return achievement;
};

export const getHiddenInfoByCrawling = async (gameId) => {
  const hiddenAchievements = [];

  const url = `https://completionist.me/steam/app/${gameId}/achievements?display=mosaic&sort=created&order=desc`;
  const hiddenResponse = await axios.get(url);
  const html = hiddenResponse.data;
  const $ = cheerio.load(html);
  let titles = [];
  let descriptions = [];

  $('span.title').each(function (i, e) {
    titles[i] = $(this).text().trim();
  });

  $('span.description').each(function (i, e) {
    descriptions[i] = $(this).text().trim();
  });

  titles.forEach((title, i) => {
    hiddenAchievements.push({
      name: titles[i],
      description: descriptions[i],
    });
  });

  return hiddenAchievements;
};
