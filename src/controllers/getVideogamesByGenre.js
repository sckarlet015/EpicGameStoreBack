getVideogamesDb = require ("./getVideogamesDb.js");
const { Videogame } = require("../db.js");

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
 
module.exports = getVideogamesByGenre;

// const getVideogamesDb = require ("./getVideogamesDb.js");

// const findVideogamesByName = async (name) => {
//     try {
//       const videogamesDb = await getVideogamesDb();

//       const filteredVideogamesDb = videogamesDb.filter((videogame) =>
//         videogame.name.toLowerCase().includes(name.toLowerCase())
//       );

//       const mergedVideogames = [...filteredVideogamesDb];
//       return mergedVideogames;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

// module.exports = findVideogamesByName