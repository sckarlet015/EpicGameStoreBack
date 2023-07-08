const { Videogame, Genre, Platform, Developers } = require("../db.js");


const createdGame = async (name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer) => {
    try {
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
            where: { name: developer },
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
                console.log("in use");
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

        return newVideogame;
    } catch (error) {
        console.log(error);
    }
};

module.exports = createdGame;

// Codigo a cambiar 

// const { Videogame, Genre, Platform } = require("../db.js");

// const createVideogame = async (name, description, launchDate, rating, image, genreIds, platformsIds) => {
//   try {
//     const newVideogame = await Videogame.create({
//       name,
//       description,
//       launchDate,
//       rating, 
//       image,
//     });

//     await newVideogame.addGenres(genreIds);
//     await newVideogame.addPlatforms(platformsIds);

//     return newVideogame;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to create videogame');
//   }
// };

//module.exports = createVideogame;