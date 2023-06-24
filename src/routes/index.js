const { Router } = require('express');
const express = require("express");
const genresRouter = require("./genresRouter.js");
const videogamesRouter = require("./videogamesRouter.js");
const platformsRouter = require("./platformsRouter.js")
const createPlatform = require("../controllers/createPlatforms.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(createPlatform);
router.use(express.json());

router.use("/platforms", platformsRouter);
router.use("/genres", genresRouter);
router.use("/videogames", videogamesRouter)

module.exports = router;

