// require('dotenv').config();
// const axios = require('axios').default;
// const { API_KEY } = process.env;
// const { Developers } = require("../db.js");

// function* countGenerator(start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i;
//   }
// }
// const generator = countGenerator(1, 5);

// const getDevelopers = async() => {
//   try {
    
//     const pageNumber = generator.next().value;
//     const gamesPerPage = 40
    
//     console.log(pageNumber);

//       const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}&page=${pageNumber}&page_size=${gamesPerPage}`);
//       const developersData = response.data.results;
//       const developersToAdd = developersData.map(developer => ({"name": developer.name, "games":developer.games.map(g=>g.id)}));
//       const developer = await Developers.bulkCreate(developersToAdd);
//       if (response.status === 200) {
//         const developersDb = await Developers.findAll();
//         return developersDb;
//         }else {
//         throw new Error(response.statusText);
//         }

//   } catch (error) {
//     throw new Error(error);
//   }
// };

// module.exports = getDevelopers


require('dotenv').config();
const axios = require('axios').default;
const { API_KEY } = process.env;
const { Developers } = require("../db.js");

let currentPage = 1;
const gamesPerPage = 40;

const getDevelopers = async () => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}&page=${currentPage}&page_size=${gamesPerPage}`);
    const developersData = response.data.results;
    const developersToAdd = developersData.map(developer => ({ "name": developer.name, "games": developer.games.map(g => g.id) }));
    const addedDevelopers = await Developers.bulkCreate(developersToAdd);

    if (response.status === 200) {
      const devs = await Developers.findAll();

    const allDevelopers = devs.map(developer => ({
      id: developer.id,
      name: developer.name,
      games: developer.games
    }));
    currentPage++; // Increment the current page number

    return allDevelopers;

    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getDevelopers;
