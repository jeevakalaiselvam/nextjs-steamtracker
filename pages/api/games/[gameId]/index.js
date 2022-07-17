import { READ_JSON } from '../../../../helper/fileHelper';

const handler = async (req, res) => {
  console.clear();
  if (req.method === 'GET') {
    const { gameId } = req.query;

    READ_JSON()
      .then((data) => {
        const games = data.games;
        const selectedGame = games.find((game) => game.appid == gameId);
        res.status(200).json({ status: 'success', game: selectedGame });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
