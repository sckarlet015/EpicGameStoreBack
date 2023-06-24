const getVideogamesApi = require ("./getVideogamesApi.js");
const getVideogamesDb = require ("./getVideogamesDb.js");

const findVideogamesByName = async (name) => {
    try {
      const videogamesApi = await getVideogamesApi();
      const videogamesDb = await getVideogamesDb();
  
      const filteredVideogamesApi = videogamesApi.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      const filteredVideogamesDb = videogamesDb.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      
      const mergedVideogames = [...filteredVideogamesApi, ...filteredVideogamesDb];
      return mergedVideogames;
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = findVideogamesByName