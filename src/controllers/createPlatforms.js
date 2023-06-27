const axios = require('axios');
const { Platform } = require("../db.js");
const { API_KEY } = process.env;
require('dotenv').config();

const createPlatform = async (req, res, next) => {
  try {
    const platforms = await Platform.findAll()
    if(platforms.length === 0){
      const url = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
      const response = await axios.get(url);
      const platformsData = response.data.results;
      const platformsToAdd = platformsData.map(platform => ({ platformName: platform.name }));
      await Platform.bulkCreate(platformsToAdd);
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = createPlatform;



