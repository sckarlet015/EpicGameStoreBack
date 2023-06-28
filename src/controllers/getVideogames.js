const getVideogamesDb = require("./getVideogamesDb.js")


const getVideogames = async () => {
    try {
        let videogamesDb = await getVideogamesDb();
        return videogamesDb;
    } catch (error) {
        return new Error(error.message);
    }
}

module.exports = getVideogames 