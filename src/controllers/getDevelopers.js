require('dotenv').config();
const axios = require('axios').default;
const { API_KEY } = process.env;
const { Developers } = require("../db.js");

function* countGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
const generator = countGenerator(1, 5);

const getDevelopers = async() => {
  try {
    
    const pageNumber = generator.next().value;
    const gamesPerPage = 40
    
    console.log(pageNumber);
    // const developersDb = await Developers.findAll();
    // if(developersDb.length === 0){
      const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}&page=${pageNumber}&page_size=${gamesPerPage}`);
      const developersData = response.data.results;
      const developersToAdd = developersData.map(developer => ({"name": developer.name, "games":developer.games.map(g=>g.name)}));
      const developer = await Developers.bulkCreate(developersToAdd);
      if (response.status === 200) {
        const developersDb = await Developers.findAll();
        return developersDb;
        }else {
        throw new Error(response.statusText);
        }
    // }else{
    //   return developersDb
    // }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getDevelopers

