const { Videogame, Genre, Platform } = require("../db.js");
const getVideogamesApi = require("./getVideogamesApi.js")
const findAllGenres = require("./findAllGenres.js")

const addGenresToVideogame = async (videogameId, genreIds) => {
  try {
    console.log(genreIds);
    const videogame = await Videogame.findOne({ where: { apiId: videogameId } });
    if (!videogame) {
      throw new Error(`Videogame with ID ${videogameId} not found`);
    }

    for (const genreId of genreIds) {
      const genre = await Genre.findByPk(genreId);
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



const createVideogame = async () => {
  try {
    const videogamesToAdd = await getVideogamesApi();
    const createdGames = await Videogame.bulkCreate(videogamesToAdd);
    const genresDb = await findAllGenres();
    const firstGenre = genresDb[0].id
    // console.log(firstGenre);

    fisrtVideogameId = createdGames[0].dataValues.id
    // console.log(fisrtVideogameId);

    // await addGenresToVideogame(fisrtVideogameId, firstGenre);
    
    for (const videogame of videogamesToAdd) {
      const apiId = videogame.apiId
      const genres = videogame.genres
      await addGenresToVideogame(apiId, genres)
    }


    const videogames = await Videogame.findAll({
      attributes: ['id', 'name', 'description', 'launchDate', 'rating', 'image', 'screenshots', 'price', 'stock', 'active'],
      include: {
        model: Genre,
        attributes: ['id', 'genreName'],
        through: { attributes: [] },
      },
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
      }))
    }));

    return modifiedResponse;
    
    

  } catch (error) {
    
  }
};

module.exports = createVideogame;

