require('dotenv').config();
const axios = require('axios').default;
const { API_KEY } = process.env;
const { Developers } = require("../db.js");

const getDevelopers = async() => {
  try {
    const developersDb = await Developers.findAll();
    if(developersDb.length === 0){
      const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}`);
      const developersData = response.data.results;
      const developersToAdd = developersData.map(developer => ({"name": developer.name, "games":developer.games.map(g=>g.name)}));
      const developer = await Developers.bulkCreate(developersToAdd);
      if (response.status === 200) {
        return developer;
        }else {
        throw new Error(response.statusText);
        }
    }else{
      return developersDb
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getDevelopers

