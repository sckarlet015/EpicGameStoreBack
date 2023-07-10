const { Videogame, Platform, Developers, Genre, Users} = require("../db.js");
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
        where: {
          active: true
        }
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

const createGame = async (name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer, sellerId) => {
  try {

    const user = await Users.findByPk(sellerId);
    userRole = user.role;
    userStatus = user.isActive;
    if(!userStatus) return "Cuenda inactiva";
    //if(userRole === "cliente") return "Por favor ingresa con una cuenta de vendedor";

    const game = await Videogame.findOne({
      where: { name: name}
    })
      
    if(game) return "intenta con otro nombre"

    const screenshotsString = screenshots.join(',');
    const newVideogame = await Videogame.create({
        name,
        description,
        launchDate,
        rating,
        image,
        screenshots: screenshotsString,
        price,
        stock,
    });

    const developerDb = await Developers.findOne({
        where: { name: developer }
    });


      if (developerDb) {
        // Developer with the given name exists in the database
        await developerDb.update({
            games: [...developerDb.games, newVideogame.id],
        });
      } else {
        // Developer with the given name does not exist in the database
        const newDev = await Developers.create({
            name: developer,
            games: [newVideogame.id],
        });
        await newVideogame.setDeveloper(newDev.id);
      }

      for (const name of genres) {
        const genre = await Genre.findOne({
            where: { genreName: name },
          });
        if (genre) {
            await newVideogame.addGenre(genre);
        }
    };

    for (const name of platforms) {
        const platform = await Platform.findOne({
            where: { platformName: name },
          });
        if (platform) {
            await newVideogame.addPlatform(platform);
        }
    };

    //if(userRole === "vendedor"){
        await newVideogame.setSeller(user);
    //};

    return newVideogame;
} catch (error) {
    return new Error(error.message);
};
};

const patchGame = async (videogameId, updates) => {
  try {
    const userId = updates.userId;
    const newName = updates.name;
    const newDescription = updates.description;
    const newImage = updates.image;
    const newscreenshots = updates.screenshots;
    const newPrice = updates.price;
    const newStock = updates.stock;
    const newActive = updates.active
    const videogame = await Videogame.findByPk(videogameId);
    const videogameUser = videogame.userId;
    const user = await Users.findByPk(userId);
    const userRole = user.role;
    userStatus = user.isActive;

    if(!userStatus) return "Cuenda inactiva";

    if(userRole === "admin"){
        if(newName) await videogame.update({ name: newName });
        if(newDescription) await videogame.update({ description: newDescription });
        if(newImage) await videogame.update({ image: newImage });
        if(newscreenshots) await videogame.update({ screenshots: newscreenshots });
        if(newPrice) await videogame.update({ price: newPrice });
        if(newStock) await videogame.update({ stock: newStock });
        if(newActive) await videogame.update({ active: newActive });
        const updatedVideogame = await Videogame.findByPk(videogameId);
        return updatedVideogame;
    };

    if(videogameUser !== userId){
        return "invalid user";
    }else{
      if(newName) await videogame.update({ name: newName });
      if(newDescription) await videogame.update({ description: newDescription });
      if(newImage) await videogame.update({ image: newImage });
      if(newscreenshots) await videogame.update({ screenshots: newscreenshots });
      if(newPrice) await videogame.update({ price: newPrice });
      if(newStock) await videogame.update({ stock: newStock });
      if(newActive) await videogame.update({ active: newActive });
      const updatedVideogame = await Videogame.findByPk(videogameId);
      return updatedVideogame;
    };
  } catch (error) {
      return new Error(error.message);
  };
};


module.exports = { 
  getVideogames , 
  getVideogamesByGenre, 
  getVideogamesDb, 
  patchGame,
  createGame
}