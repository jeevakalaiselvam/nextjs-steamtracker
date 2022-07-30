export const GAMES_SORT_COMPLETION_ASC = "GAMES_SORT_COMPLETION_ASC";
export const GAMES_SORT_COMPLETION_DESC = "GAMES_SORT_COMPLETION_DESC";
export const GAMES_SORT_NAME_ASC = "GAMES_SORT_NAME_ASC";
export const GAMES_SORT_NAME_DESC = "GAMES_SORT_NAME_DESC";
export const GAMES_SORT_PINNED = "GAMES_SORT_PINNED";
export const GAMES_SORT_STARTED = "GAMES_SORT_STARTED";

export const GAME_ACHIEVEMENT_SORT_LATEST = "GAME_ACHIEVEMENT_SORT_LATEST";
export const GAME_ACHIEVEMENT_SORT_OLDEST = "GAME_ACHIEVEMENT_SORT_OLDEST";

//Settings Filter
export const LOCALSTORAGE_GAME_SETTING_DISPLAY =
  "LOCALSTORAGE_GAME_SETTING_DISPLAY";
export const GAME_SETTING_DISPLAY_HOVER = "GAME_SETTING_DISPLAY_HOVER";
export const GAME_SETTING_DISPLAY_VISIBLE = "GAME_SETTING_DISPLAY_VISIBLE";
export const GAME_SETTING_DISPLAY_PERCENTAGE =
  "GAME_SETTING_DISPLAY_PERCENTAGE";

//AchievementSidebarSettings Filter
export const LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY =
  "LOCALSTORAGE_ACHIEVEMENTSIDEBAR_SETTING_DISPLAY";
export const GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL =
  "GAME_ACHIEVEMENTSIDEBAR_DISPLAY_NORMAL";
export const GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL =
  "GAME_ACHIEVEMENTSIDEBAR_DISPLAY_SMALL";

//Journal Font Settings
export const LOCALSTORAGE_JOURNAL_SETTING_FONT =
  "LOCALSTORAGE_JOURNAL_SETTING_FONT";
export const GAME_JOURNAL_FONT_SETTING_SMALL =
  "GAME_JOURNAL_FONT_SETTING_SMALL";
export const GAME_JOURNAL_FONT_SETTING_MEDIUM =
  "GAME_JOURNAL_FONT_SETTING_MEDIUM";
export const GAME_JOURNAL_FONT_SETTING_LARGE =
  "GAME_JOURNAL_FONT_SETTING_LARGE";

//Videos LocalStorage
export const LOCALSTORAGE_JOURNAL = "LOCALSTORAGE_JOURNAL";

//Game Filter
export const GAME_ACHIEVEMENT_SORT_EASY = "GAME_ACHIEVEMENT_SORT_EASY";
export const GAME_ACHIEVEMENT_SORT_HARD = "GAME_ACHIEVEMENT_SORT_HARD";

export const GAME_ACHIEVEMENT_SORT_ALL = "GAME_ACHIEVEMENT_SORT_ALL";
export const GAME_ACHIEVEMENT_SORT_LOCKED = "GAME_ACHIEVEMENT_SORT_LOCKED";
export const GAME_ACHIEVEMENT_SORT_UNLOCKED = "GAME_ACHIEVEMENT_SORT_UNLOCKED";

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

  if (filterOption === GAMES_SORT_PINNED) {
    const newGames = games.filter((game) => {
      if (typeof window !== undefined) {
        return (
          JSON.parse(localStorage.getItem(`PINNED_${game.appid}`)) || false
        );
      }
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_NAME_ASC) {
    const newGames = games.sort((game1, game2) => {
      return game1.gameName > game2.gameName;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_NAME_DESC) {
    console.log("WORKING");
    const newGames = games.sort((game1, game2) => {
      return game1.gameName < game2.gameName;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_STARTED) {
    const newGames = games.filter((game) => {
      if (+game.completed > 0) {
        return game;
      }
    });
    const sortedGames = newGames.sort((game1, game2) => {
      return +game1.percentage < +game2.percentage;
    });
    return sortedGames;
  }
};
