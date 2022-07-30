export const getAPIUrlPrefix = () => {
  let PREFIX_URL = "";
  switch (process.env.NODE_ENV) {
    case "development":
      PREFIX_URL = "http://localhost:3000/api";
      break;
    case "production":
      PREFIX_URL = "https://nextjs-steamtracker.vercel.app/api";
      break;
    default:
      PREFIX_URL = "http://localhost:3000/api";
      break;
  }

  return PREFIX_URL;
};

export const API_GET_GAMES = () => {
  return `/api/games`;
};
export const API_GET_GAME = (gameId) => {
  return `/api/games/${gameId}`;
};

export const API_GET_ACHIEVEMENTS = (gameId) => {
  return `/api/games/${gameId}`;
};

export const API_GET_HIDDEN_ACHIEVEMENTS = (gameId) => {
  return `/api/hidden/${gameId}`;
};

export const API_REFRESH_DATA = () => {
  return `/api/refresh`;
};

export const API_PERFECT_GAMES = () => {
  return `/api/perfect`;
};

export const API_TOTAL_XP = () => {
  return `/api/totalxp`;
};

export const API_TOTAL_XP_GAME = (gameId) => {
  return `/api/totalxp/${gameId}`;
};
