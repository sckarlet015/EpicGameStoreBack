const { Videogame, Platform, Developers, Genre, Users} = require("../db.js");

const findVideogameByStatus = async (gameStatus) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              status: gameStatus,
            }
        });
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
}; 

const findVideogamesBySeller = async (sellerId) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              userId: sellerId
            }
          });
          return videogames;
    } catch (error) {
        throw new Error(error);
    };
}

const findAllVideogames = async () => {
    try {
        const videogames = await Videogame.findAll();
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
};

const findGameById = async (videogameId) => {
    try {
        console.log(videogameId);
        const videogame = await await Videogame.findOne({
            where: {
              id: videogameId,
            },
            include: [
              {
                model: Genre,
                attributes: ['genreName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Platform,
                attributes: ['platformName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Developers,
                attributes: ['id', 'name'],
              },
            ],
          });
        return videogame;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = { 
    findVideogameByStatus,
    findVideogamesBySeller,
    findAllVideogames,
    findGameById
  }
