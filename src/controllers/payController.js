const mercadopago = require("mercadopago");

const pay = async (res) => {
    res.send('el servidor de mercado pago funciona ^^')
}

const getPreference = async(req, res) => {
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
    }
    return preference
}

const createPreference = async(preference, res) => {
  let newPreference =  mercadopago.preferences
  .create(preference)
      .then(function (response) {
          res.json({
              id: response.body.id
          });
      }).catch(function (error) {
          console.log(error);
      });
    return newPreference
}

const getFeedback = async(req) => {
    let feed = res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
    return feed;
}

module.exports = {getPreference, createPreference, getFeedback, pay};