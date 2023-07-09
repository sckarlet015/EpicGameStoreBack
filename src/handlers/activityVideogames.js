const { findVideogameByIdDB, findVideogameByName} = require("../controllers/findController.js");
const { getVideogames, getVideogamesByGenre, activeVideogame, createGame } = require("../controllers/videogamesController.js")


const getAllVideogames = async (req,res) => {
    try {
        const { name, genreName } = req.query;
        if(name){
            const videogames = await findVideogameByName(name);
            res.status(200).json(videogames);
        }else if(genreName){
            const videogames = await getVideogamesByGenre(genreName);
            res.status(200).json(videogames);
        }
        else{
            const videogames = await getVideogames();
            res.status(200).json(videogames);
        };
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

const getVideogamesById = async (req, res) => {
    const { id } = req.params;
    try {
        let videogame = {};
            videogame = await findVideogameByIdDB(id);
            res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

const postVideogames = async (req, res) => {
    try {
      const { name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer, sellerId } = req.body;
      const newVideogame = await createGame(name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer, sellerId);
      res.status(200).json(newVideogame);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    };
};

const patchVideogame = async(req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const response = await activeVideogame(id, userId);
        res.status(200).json(response);
    } catch (error) {
        
    }
}

module.exports= { getAllVideogames, getVideogamesById, postVideogames, patchVideogame }