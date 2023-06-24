const { API_KEY } = process.env;
const axios = require('axios').default;

const getVideogamesApi = async () => {
  try {
    const totalPages = 3;
    const gamesPerPage = 20;
    const apiKey = process.env.API_KEY;
    const videogamesApi = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${gamesPerPage}`;
      const response = await axios.get(url);
      const videogamesApiRaw = response.data.results;
      const videogames = videogamesApiRaw.map(({ id, name, background_image, genres, rating }) => ({
        id,
        name,
        background_image,
        genres,
        rating
      }));
      videogamesApi.push(...videogames);
    }

    console.log(videogamesApi);
    return videogamesApi;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

module.exports = getVideogamesApi;


// https://api.rawg.io/api/games?key=e824cce8fca641dcabd62f3d8a3631b0&page=1&page_size=$100