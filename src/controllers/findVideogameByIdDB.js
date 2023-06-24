const express = require('express');
const { Videogame, Genre, Platform } = require ("../db.js")

const findVideogameByIdDB = async (id) => {
    let videogame = await Videogame.findByPk(id, {
        include: [
            {
              model: Genre,
              attributes: ["genreName"],
              through: {
                attributes: [],
              },
            },
            {
              model: Platform,
              attributes: ["platformName"],
              through: {
                attributes: [],
              },
            },
          ],
    })
    if(!videogame) throw Error("Videogame does not exist");
    return videogame
};

module.exports = findVideogameByIdDB