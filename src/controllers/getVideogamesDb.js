const { Videogame, Genre } = require("../db.js");
const createVideogame = require("./createVideogame.js")

const getVideogamesDb = async () => {
  try {
    const videogames = await Videogame.findAll();
    if(videogames.length ===0 ){
      const newVideogames = await createVideogame();
      console.log(newVideogames);
      return newVideogames
    }else {
      return videogames
    }
  } catch (error) {
    throw new Error(error);
  };
  
};

module.exports = getVideogamesDb;
