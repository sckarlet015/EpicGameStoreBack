const { Videogame, Genre, Developers, Platform, Users } = require("../db.js");
const createVideogame = require("./createVideogame.js")

const getVideogamesDb = async () => {
  try {
    const dbvideogames = await Videogame.findAll();
    if(dbvideogames.length ===0 ){
      const newVideogames = await createVideogame();
      return newVideogames
    }else {
      const videogames = await Videogame.findAll({
        attributes: [
          'id', 
          'name', 
          'description', 
          'launchDate', 
          'rating', 
          'image', 
          'screenshots', 
          'price', 
          'stock', 
          'active',
        ],
        include: [
          {
            model: Genre,
            attributes: ['id', 'genreName'],
            through: { attributes: [] },
          },
          {
            model: Platform,
            attributes: ['id', 'platformName'],
            through: { attributes: [] },
          },
          {
            model: Developers,
            attributes: ['id', 'name'],
          },
          {
            model: Users,
            as: 'seller',
            attributes: ['id', `userName`], 
          }
        ],
      });
      return videogames
    }
  } catch (error) {
    throw new Error(error);
  };
  
};

module.exports = getVideogamesDb;
