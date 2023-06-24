const { Videogame, Genre, Platform } = require("../db.js");

const createVideogame = async (name, description, launchDate, rating, image, genreIds, platformsIds) => {
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      launchDate,
      rating, 
      image,
    });

    await newVideogame.addGenres(genreIds);
    await newVideogame.addPlatforms(platformsIds);

    return newVideogame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create videogame');
  }
};

module.exports = createVideogame;
