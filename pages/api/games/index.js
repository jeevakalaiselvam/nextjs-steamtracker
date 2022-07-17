import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
  FETCH_ALL_GAMES,
} from '../../../helper/urlHelper';
import axios from 'axios';
import { READ_JSON } from '../../../helper/fileHelper';

const handler = async (req, res) => {
  console.clear();
  if (req.method === 'GET') {
    READ_JSON()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({ status: 'error' });
      });
  }
};

export default handler;
