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
const getVideogames = require('./src/controllers/getVideogames.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;

/////////////////////////////

const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
	access_token: "TEST-6338746871170821-062813-66a3ebbc2be2774a962f32cadd2ab029-142587917",
});

app.get("/", function(req,res){
  res.send('el servidor de mercado pago funciona ^^')
})

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3000/home",
			"failure": "http://localhost:3000/home",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences
    .create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
  console.log('The server is now running at 8080')
})  

/////////////////////////////

// Syncing all the models at once.

conn.sync({ force: true }).then(async() => {
  await getVideogames()
  server.listen(PORT, "0.0.0.0", () => {
    console.log('%s listening at', PORT); // eslint-disable-line no-console
  });
});


