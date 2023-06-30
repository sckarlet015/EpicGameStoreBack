const { Videogame, Genre, Platform } = require("../db.js");
const getVideogamesApi = require("./getVideogamesApi.js")
const findAllGenres = require("./findAllGenres.js");
const getPlatforms = require("./getPlatforms.js")

const addGenresToVideogame = async (videogameId, genreNames) => {
  try {
    const videogame = await Videogame.findOne({ where: { apiId: videogameId } });
    if (!videogame) {
      throw new Error(`Videogame with ID ${videogameId} not found`);
    }

    for (const name of genreNames) {
      const genre = await Genre.findOne({ where: { genreName: name } });
      if (genre) {
        await videogame.addGenre(genre);
      }
    }
    
    return videogame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add genres to the videogame');
  }
};

const addPlatformsToVideogame = async (videogameId, platformNames) => {
  try {
    const videogame = await Videogame.findOne({ where: { apiId: videogameId } });
    if (!videogame) {
      throw new Error(`Videogame with ID ${videogameId} not found`);
    }

    for (const name of platformNames) {
      const platform = await Platform.findOne({ where: { platformName: name } });
      if (platform) {
        await videogame.addPlatform(platform);
      }
    }
    
    return videogame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add genres to the videogame');
  }
};



const createVideogame = async () => {
  try {
    const videogamesToAdd = await getVideogamesApi();
    const createdGames = await Videogame.bulkCreate(videogamesToAdd);
    const genresDb = await findAllGenres();
    const PlatformsDb = await Platform.findAll();

    
    for (const videogame of videogamesToAdd) {
      const apiId = videogame.apiId
      const genres = videogame.genres
      const platforms = videogame.platforms
      
      await addPlatformsToVideogame(apiId, platforms)
      await addGenresToVideogame(apiId, genres)
    }


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
      ],
    });
    
    
    const modifiedResponse = videogames.map(videogame => ({
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      launchDate: videogame.launchDate,
      rating: videogame.rating,
      image: videogame.image,
      screenshots: videogame.screenshots,
      price: videogame.price,
      stock: videogame.stock,
      active: videogame.active,
      genres: videogame.Genres.map(genre => ({
        id: genre.id,
        genreName: genre.genreName
      })),
      platforms: videogame.Platforms.map(platform => ({
        id: platform.id,
        platformName: platform.platformName
      }))
    }));

    return modifiedResponse;
    
    

  } catch (error) {
    
  }
};

module.exports = createVideogame;

