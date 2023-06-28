const { Videogame, Genre, Platform } = require("../db.js");
const getVideogamesApi = require("./getVideogamesApi.js")

const createVideogame = async () => {
  try {
    const videogamesToAdd = await getVideogamesApi();
    const createdGames = await Videogame.bulkCreate(videogamesToAdd);
    console.log(createdGames);
    return createdGames
  } catch (error) {
    
  }
};

module.exports = createVideogame;
