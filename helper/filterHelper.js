export const GAMES_SORT_COMPLETION_ASC = 'GAMES_SORT_COMPLETION_ASC';
export const GAMES_SORT_COMPLETION_DESC = 'GAMES_SORT_COMPLETION_DESC';
export const GAMES_SORT_NAME_ASC = 'GAMES_SORT_NAME_ASC';
export const GAMES_SORT_NAME_DESC = 'GAMES_SORT_NAME_DESC';

export const GAME_ACHIEVEMENT_SORT_LATEST = 'GAME_ACHIEVEMENT_SORT_LATEST';
export const GAME_ACHIEVEMENT_SORT_OLDEST = 'GAME_ACHIEVEMENT_SORT_OLDEST';

//Settings Filter
export const LOCALSTORAGE_GAME_SETTING_DISPLAY =
  'LOCALSTORAGE_GAME_SETTING_DISPLAY';
export const GAME_SETTING_DISPLAY_HOVER = 'GAME_SETTING_DISPLAY_HOVER';
export const GAME_SETTING_DISPLAY_VISIBLE = 'GAME_SETTING_DISPLAY_VISIBLE';
export const GAME_SETTING_DISPLAY_PERCENTAGE =
  'GAME_SETTING_DISPLAY_PERCENTAGE';

//Game Filter
export const GAME_ACHIEVEMENT_SORT_EASY = 'GAME_ACHIEVEMENT_SORT_EASY';
export const GAME_ACHIEVEMENT_SORT_HARD = 'GAME_ACHIEVEMENT_SORT_HARD';

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
