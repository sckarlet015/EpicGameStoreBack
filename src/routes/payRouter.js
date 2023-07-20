const { Router } = require('express');
const { getPay, postPay, getFeedPay } = require('../handlers/activityPay');
const payRouter = Router();

payRouter.post("/", getPay)
payRouter.post("/create_preference", postPay)
payRouter.get("/feedback", getFeedPay)
//payRouter.get("/succesfulPurchase/:id", managePay)  // se reponde con un id del nuevo carrito, recibe el id del carrito viejo  

module.exports = payRouter;


// Rutas de estadisticas de usuarios
// Ruta para la compra exitosa
//     se recibe el id del carrito del usuario
//     se crea un nuevo carrito 
//     para cada uno de los juegos se hace su logica para sumar a estadisticas 
// Ruta para estadisticas de juegos