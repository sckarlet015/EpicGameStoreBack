const { Videogame, Genre } = require("../db.js");
const createVideogame = require("./createVideogame.js")

const getVideogamesDb = async () => {
  try {
    const videogames = await Videogame.findAll({
      attributes: ['id', 'name', 'description', 'launchDate', 'rating', 'image', 'screenshots', 'price', 'stock', 'active'],
      include: {
        model: Genre,
        attributes: ['id', 'genreName'],
        through: { attributes: [] },
      },
    });
    if(videogames.length ===0 ){
      const newVideogames = await createVideogame();
      return newVideogames
    }else {
      return videogames
    }
  } catch (error) {
    throw new Error(error);
  };
  
};

module.exports = getVideogamesDb;
