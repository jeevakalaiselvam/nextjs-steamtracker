export const getAPIUrlPrefix = () => {
  let PREFIX_URL = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      PREFIX_URL = 'http://localhost:3000/api';
      break;
    case 'production':
      PREFIX_URL = 'https://nextjs-steamtracker.vercel.app/api';
      break;
    default:
      PREFIX_URL = 'http://localhost:3000/api';
      break;
  }

  return PREFIX_URL;
};

export const API_GET_GAMES = () => {
  return `${getAPIUrlPrefix()}/games`;
};
export const API_GET_GAME = (gameId) => {
  return `${getAPIUrlPrefix()}/games/${gameId}`;
};

export const API_GET_ACHIEVEMENTS = (gameId) => {
  return `${getAPIUrlPrefix()}/games/${gameId}`;
};

export const API_GET_HIDDEN_ACHIEVEMENTS = (gameId) => {
  return `${getAPIUrlPrefix()}/hidden/${gameId}`;
};

export const API_REFRESH_DATA = () => {
  return `${getAPIUrlPrefix()}/refresh`;
};

export const API_PERFECT_GAMES = () => {
  return `${getAPIUrlPrefix()}/perfect`;
};

export const API_TOTAL_XP = () => {
  return `${getAPIUrlPrefix()}/totalxp`;
};

export const API_TOTAL_XP_GAME = (gameId) => {
  return `${getAPIUrlPrefix()}/totalxp/${gameId}`;
};
