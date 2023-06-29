const { Router } = require('express');
const express = require("express");
const genresRouter = require("./genresRouter.js");
const videogamesRouter = require("./videogamesRouter.js");
const platformsRouter = require("./platformsRouter.js")
const createPlatform = require("../controllers/createPlatforms.js");
const developersRouter= require("./developersRouter.js");
const postUser = require("./userRouter.js");
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
router.use("/developers", developersRouter)
router.use("/users", postUser)
// router.use("/users", userRouter)

module.exports = router;

