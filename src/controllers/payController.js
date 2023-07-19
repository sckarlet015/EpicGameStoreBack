const mercadopago = require("mercadopago");

const pay = async (res) => {
    res.send('el servidor de mercado pago funciona ^^')
}

const getPreference = async(req, res) => {
    console.log(req.body)

    const {CartID, UserID, Videogames} = req.body
        const cartItemes = Videogames.map((item) => {
            const items = {
                title: item.title,
                unit_price: item.unit_price,
                quantity: parseInt(item.quantity),
            }

            return items;
        })

    let preference = {
        items: cartItemes,
		back_urls: {
			"success": "http://localhost:3000/favorites",
			"failure": "http://localhost:3000/home",
			"pending": ""
		},
		auto_return: "approved",
    }
    // console.log(preference);
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
};

const handlePayment = async (cartId) => {
    try {
        
    } catch (error) {
        
    }
};

module.exports = {getPreference, createPreference, getFeedback, pay, handlePayment};