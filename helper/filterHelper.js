export const GAMES_SORT_COMPLETION_ASC = 'GAMES_SORT_COMPLETION_ASC';
export const GAMES_SORT_COMPLETION_DESC = 'GAMES_SORT_COMPLETION_DESC';
export const GAMES_SORT_NAME_ASC = 'GAMES_SORT_NAME_ASC';
export const GAMES_SORT_NAME_DESC = 'GAMES_SORT_NAME_DESC';

export const GAME_ACHIEVEMENT_SORT_LATEST = 'GAME_ACHIEVEMENT_SORT_LATEST';
export const GAME_ACHIEVEMENT_SORT_OLDEST = 'GAME_ACHIEVEMENT_SORT_OLDEST';

export const getGamesFiltered = (games, filterOption) => {
  if (filterOption === GAMES_SORT_COMPLETION_DESC) {
    const newGames = games.sort((game1, game2) => {
      return +game1.percentage < +game2.percentage;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_COMPLETION_ASC) {
    const newGames = games.sort((game1, game2) => {
      return +game1.percentage > +game2.percentage;
    });
    return newGames;
  }
};
