const express = require('express');
const { Videogame, Genre, Platform, Developers } = require ("../db.js");
const findVideogameByIdApi = require("./findVideogameByIdApi.js")

const findVideogameByIdDB = async (id) => {
  const videogameCheck = await Videogame.findByPk(id);
  const description = videogameCheck.description;
  const apiId = videogameCheck.apiId
  if(!description){
    const videogame = await findVideogameByIdApi(apiId);
    const descriptionApi = videogame.description;
    const launchDate = videogame.released;
    await videogameCheck.update({
      description: descriptionApi,
      launchDate: launchDate
    });
  }
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
            }
          },
          {
            model: Developers,
            attributes: ['id', 'name'],
          }
        ],
  })
  if(!videogame) throw Error("Videogame does not exist");
  return videogame
};

module.exports = findVideogameByIdDB