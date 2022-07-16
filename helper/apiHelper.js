export const getUrlPrefix = () => {
  let PREFIX_URL = "";
  switch (process.env.NODE_ENV) {
    case "development":
      PREFIX_URL = "http://localhost:3000/api";
      break;
    case "production":
      PREFIX_URL = "http://app.com:3000/api";
      break;
    default:
      PREFIX_URL = "http://localhost:3000/api";
      break;
  }

  return PREFIX_URL;
};

export const API_GET_GAMES = () => {
  return `${getUrlPrefix()}/games`;
};
export const API_GET_GAME = (gameId) => {
  return `${getUrlPrefix()}/games/${gameId}`;
};
