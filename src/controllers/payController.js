const mercadopago = require("mercadopago");
const { creteCart } = require("./cartController");

const pay = async (user, cart) => {
    await cart.update({
        status: false
    })
    const newCart = await creteCart(user)
    return newCart
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
			"success": "http://localhost:3000/pay",
			"failure": "http://localhost:3000/pay",
			"pending": "http://localhost:3000/pay"
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