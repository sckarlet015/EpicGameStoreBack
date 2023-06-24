require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const findVideogameByIdApi = async (id) => {
    const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    try {
        let response = await axios.get(url);
        let videogameRaw = response.data;
        let videogame = (({id, name, description, released, genres, background_image, platforms, ratings}) => ({id, name, description, released, genres, background_image, platforms, ratings}))(videogameRaw);
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