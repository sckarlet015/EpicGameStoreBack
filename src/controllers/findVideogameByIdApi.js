require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const {
    Videogame,
    Genre,
    Platform
  } = require("../db.js");

const findVideogameByIdApi = async (apiId) => {
    const url = `https://api.rawg.io/api/games/${apiId}?key=${API_KEY}`;

    try {
        let response = await axios.get(url);
        let videogameRaw = response.data;
        let videogame = (({description, released}) => ({description, released}))(videogameRaw);
        if (response.status === 200) {
            return videogame
        }else {
            throw new Error(response.statusText);
        }   
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = findVideogameByIdApi