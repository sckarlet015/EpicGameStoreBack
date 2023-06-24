const axios = require('axios');
const { Router } = require('express');
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
      console.log("solo 1");
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = createPlatform;



