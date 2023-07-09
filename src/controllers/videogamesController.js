const { Videogame, Platform, Developers, Genre} = require("../db.js");
require('dotenv').config();
const axios = require('axios').default;
const { createVideogame } = require("./createController.js")

const getVideogamesDb = async () => {
  try {
    const dbvideogames = await Videogame.findAll();
    if(dbvideogames.length ===0 ){
      const newVideogames = await createVideogame();
      return newVideogames
    }else {
      const videogames = await Videogame.findAll({
        attributes: ['id', 'name', 'description', 'launchDate', 'rating', 'image', 'screenshots', 'price', 'stock', 'active'],
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
        ],
      });
      return videogames
    }
  } catch (error) {
    throw new Error(error);
  };
  
};

const getVideogames = async () => {
    try {
        let videogamesDb =  getVideogamesDb();
        return videogamesDb;
    } catch (error) {
        return new Error(error.message);
    }
}

const getVideogamesByGenre = async (name) => {
    try {
        const videogamesDb = await getVideogamesDb();
        const filteredVideogamesDb = videogamesDb.filter((videogame) => {
            const genreNames = videogame.genres
                ? videogame.genres.map((genre) => genre.genreName.toLowerCase())
                : videogame.Genres.map((genre) => genre.genreName.toLowerCase());
        
            return genreNames.includes(name.toLowerCase());
        });
        
    console.log(filteredVideogamesDb.length);

      const mergedVideogames = [...filteredVideogamesDb];
      return mergedVideogames;
    } catch (error) {
      throw new Error(error);
    };
};


module.exports = { 
  getVideogames , 
  getVideogamesByGenre, 
  getVideogamesDb, 
}