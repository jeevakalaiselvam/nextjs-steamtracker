import { FETCH_ALL_GAMES } from "../../../helper/urlHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let response = [];

    try {
      const gamesResponse = await fetch(FETCH_ALL_GAMES);
      const gamesData = await gamesResponse.json();
      response = gamesData.response.games.map((game) => {
        const newGame = {
          id: game.appid,
          playtime: game.playtime_forever,
        };
        return newGame;
      });

      res.status(200).json({ status: "success", games: response });
    } catch (error) {
      res.status(500).json({ status: "error", error: JSON.stringify(error) });
    }
  }
};

export default handler;
