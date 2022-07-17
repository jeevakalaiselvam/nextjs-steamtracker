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

export const API_REFRESH_DATA = () => {
  return `${getAPIUrlPrefix()}/refresh`;
};
