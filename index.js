//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { FRONT_LINK } = process.env;
const { PORT } = process.env;

/////////////////////////////MERCADO PAGO

const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");



app.use(cors({
  origin: FRONT_LINK, // Update with your client's origin
  methods: ['GET', 'PUT', 'POST','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());


app.use(express.json());
// app.use(cors({
//   allowedHeaders: ['Authorization'],
//   origin: "*"
// }));



mercadopago.configure({
  access_token:
    "TEST-3510852097062712-071920-8c291521074ff68bc65fe2dd93c87822-661793004",
});
  

/////////////////////////////

// Syncing all the models at once.

conn.sync({ force: true }).then(async() => {
  //await getVideogames()
  server.listen(PORT, "0.0.0.0", () => {
    console.log('%s listening at', PORT); // eslint-disable-line no-console
  });
});


