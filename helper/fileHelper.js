export const CACHE_FILE_PATH = './store/store.json';
const fsPromises = require('fs').promises;

export const WRITE_JSON = (data) => {
  return new Promise((resolve, reject) => {
    fsPromises
      .writeFile(CACHE_FILE_PATH, JSON.stringify(data))
      .then(() => {
        resolve({ status: 'success' });
      })
      .catch((error) => {
        reject({ status: 'error' });
      });
  });
};

export const READ_JSON = () => {
  return new Promise((resolve, reject) => {
    fsPromises
      .readFile(CACHE_FILE_PATH)
      .then((data) => {
        resolve({ status: 'success', games: JSON.parse(data) });
      })
      .catch((error) => {
        reject({ status: 'error' });
      });
  });
};
