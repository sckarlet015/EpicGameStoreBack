const getVideogamesApi = require("./getVideogamesApi.js")
const getVideogamesDb = require("./getVideogamesDb.js")


const getVideogames = async () => {
    try {
        // let videogamesApi = await getVideogamesApi()
        await getVideogamesApi()
        let videogamesDb = await getVideogamesDb()
        // const videogames = [...videogamesApi, ...videogamesDb];
        return videogamesDb;
    } catch (error) {
        throw new Error(response.statusText);
    }
}

module.exports = getVideogames 