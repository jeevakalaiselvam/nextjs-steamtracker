const axios = require('axios');
import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
  FETCH_ALL_GAMES,
  STEAM_ALL_ACHIEVEMENTS_PLAYER,
} from '../../helper/urlHelper';
import { writeJSONToFile, CACHE_FILE_PATH } from '../../helper/fileHelper';
const fsPromises = require('fs').promises;

const handler = async (req, res) => {
  if (req.method === 'GET') {
    let finalGamesResponse = {};

    //Get All Games for the current User
    const gamesResponse = await fetch(FETCH_ALL_GAMES);
    const gamesData = await gamesResponse.json();
    finalGamesResponse = gamesData.response.games.map((game) => {
      const newGame = {
        id: game.appid,
        playtime: game.playtime_forever,
      };
      return newGame;
    });

    //Testing Limit
    // finalGamesResponse = finalGamesResponse.slice(0, 5);

    //Get All Achievements Schema for All Games
    finalGamesResponse = await Promise.all(
      finalGamesResponse.map(async (game) => {
        const schemeAchievement = await fetch(
          FETCH_ALL_ACHIEVEMENTS_SCHEMA(game.id)
        );
        const schemeResponse = await schemeAchievement.json();
        const newGame = {
          ...game,
          name: schemeResponse.game.gameName,
          version: schemeResponse.game.gameVersion,
          achievements:
            schemeResponse.game.availableGameStats?.achievements || [],
        };
        return newGame;
      })
    );

    //Filter Games without Achievements
    finalGamesResponse = finalGamesResponse.filter(
      (game) => game.achievements.length > 0
    );

    //Combine Global Achievement Status
    finalGamesResponse = await Promise.all(
      finalGamesResponse.map(async (game) => {
        const globalAchievementsResponse = await fetch(
          FETCH_ALL_ACHIEVEMENTS_GLOBAL(game.id)
        );
        const globalAchievementsData = await globalAchievementsResponse.json();
        const globalAchievements =
          globalAchievementsData.achievementpercentages.achievements;
        let newAchievements = game.achievements.map((achievement) => {
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
        const newGame = {
          ...game,
          achievements: newAchievements,
        };
        return newGame;
      })
    );

    //Add Player Achievement Progress
    finalGamesResponse = await Promise.all(
      finalGamesResponse.map(async (game) => {
        const playerAchievementsResponse = await fetch(
          STEAM_ALL_ACHIEVEMENTS_PLAYER(game.id)
        );
        const playerAchievementData = await playerAchievementsResponse.json();
        const playerAchievements =
          playerAchievementData.playerstats.achievements;
        const gameName = playerAchievementData.playerstats.gameName;

        let newAchievements = game.achievements.map((achievement) => {
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
        });
        const toGet =
          (newAchievements &&
            newAchievements.length > 0 &&
            newAchievements.filter((achievement) => achievement.achieved != '1')
              .length) ||
          0;
        const completionPercentage =
          (newAchievements &&
            newAchievements.length > 0 &&
            100 - Math.floor((toGet / newAchievements.length) * 100)) ||
          0;
        const newGame = {
          ...game,
          name: gameName,
          achievements: newAchievements,
          completion: completionPercentage,
          toGet: toGet,
        };
        return newGame;
      })
    );
    //Get all Games and Refresh data in File

    //Write to File
    fsPromises
      .writeFile(CACHE_FILE_PATH, JSON.stringify(finalGamesResponse))
      .then(() => {
        res.status(200).json({ status: 'success' });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error', error });
      });
  }
};

export default handler;
