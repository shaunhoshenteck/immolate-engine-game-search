// Base URL
const base_url = "https://api.rawg.io/api/";

// Getting the month
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

// Getting the day
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

// Getting the current year
const currentYear = new Date().getFullYear();
// Getting the current month
const currentMonth = getCurrentMonth();
// Getting the current day
const currentDay = getCurrentDay();
// Getting the current dates
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// Key
const apiKey = "c654833de37a484eaf954eee3e013dd9";

// Popular games
const popular_games = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${apiKey}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const new_games = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesUrl = () => `${base_url}${upcoming_games}`;
export const newGamesUrl = () => `${base_url}${new_games}`;
// console.log(popularGamesURL());

//GAME DETAILS
export const gameDetailsURL = (game_id) => `${base_url}games/${game_id}`;

//GAME SCREENSHOTS
export const gameScreenShotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${apiKey}`;

//Searched game
export const searchGameURL = (game_name) =>
  `${base_url}games?search=${game_name}&page_size=9`;
