const axios = require("axios");
import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
  FETCH_ALL_GAMES,
  STEAM_ALL_ACHIEVEMENTS_PLAYER,
} from "../../helper/urlHelper";
import { CACHE_FILE_PATH, WRITE_JSON } from "../../helper/fileHelper";
const fsPromises = require("fs").promises;

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      let finalGamesResponse = [];

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
      finalGamesResponse = finalGamesResponse.slice(0, 100);

      //Get all Global Achievements
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
              schemeResponse?.game?.availableGameStats?.achievements ?? [],
          };
          return newGame;
        })
      );

      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    }

    //Write to File
    // fsPromises
    //   .writeFile(CACHE_FILE_PATH, JSON.stringify(finalGamesResponse))
    //   .then(() => {
    //     res.status(200).json({ status: "success", data: finalGamesResponse });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ status: "error", error });
    //   });
  }
};

export default handler;
