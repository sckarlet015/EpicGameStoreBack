// const { Videogame, Genre } = require("../db.js");

// const getVideogamesDb = async () => {
//     try {
//         const response = await Videogame.findAll({
//             include: [
//               {
//                 model: Genre,
//                 attributes: [["genreName", "name"]], // Map genreName to name
//                 through: {
//                   attributes: [],
//                 },
//               },
//             ],
//           });
//         return response
//     } catch (error) {
//         throw new Error(response.statusText);
//     }
// }

// module.exports = getVideogamesDb;


// CGTP
const { Videogame, Genre } = require("../db.js");

const getVideogamesDb = async () => {
  try {
    const response = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: [["genreName", "name"]],
          through: {
            attributes: [],
          },
        },
      ],
    });

    // Extract the genres from the response
    const modifiedResponse = response.map((game) => {
      const genres = game.Genres.map((genre) => ({ name: genre.name }));

      return {
        ...game.toJSON(),
        genres: [...genres, ...game.Genres],
      };
    });

    return modifiedResponse;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getVideogamesDb;
