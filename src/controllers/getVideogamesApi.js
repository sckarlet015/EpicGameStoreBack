const {  API_KEY } = process.env;
const axios = require('axios').default;
const arrangeApiGames = require("../handlers/arrangeApiGames.js")

const getRandomPrice = () => {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
};

const getVideogamesApi = async () => {
  try {
    const totalPages = 3;
    const gamesPerPage = 20;
    const videogamesApi = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${gamesPerPage}`;
      const response = await axios.get(url);
      const videogamesApiRaw = response.data.results;
      const videogames = videogamesApiRaw.map(({ id, name, background_image, genres, platforms, short_screenshots, rating }) => ({
        apiId: id,
        name,
        background_image,
        genres,
        platforms,
        screenshots: short_screenshots,
        rating,
        price: getRandomPrice()
      }));
      videogamesApi.push(...videogames);
    };

    const videogames = arrangeApiGames(videogamesApi)
    console.log(videogamesApi);
    return videogames;
  } catch (error) {
    throw new Error(error.response.statusText);
  };
};

module.exports = getVideogamesApi;


// https://api.rawg.io/api/games?key=e824cce8fca641dcabd62f3d8a3631b0&page=1&page_size=$100