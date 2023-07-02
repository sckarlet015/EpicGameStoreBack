const getVideogamesApi = require ("./getVideogamesApi.js");
const getVideogamesDb = require ("./getVideogamesDb.js");

const findVideogamesByName = async (name) => {
    try {
      const videogamesDb = await getVideogamesDb();
      const filteredVideogamesDb = videogamesDb.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      
      const mergedVideogames = [...filteredVideogamesDb];
      return mergedVideogames;
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = findVideogamesByName