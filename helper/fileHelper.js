export const CACHE_FILE_PATH = "./store/store.json";
const fsPromises = require("fs").promises;

export const WRITE_JSON = (data) => {
  fsPromises
    .writeFile(CACHE_FILE_PATH, JSON.stringify(data))
    .then(() => {
      console.log(
        "----------------------WRITE COMPLETED---------------------------"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
