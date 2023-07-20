const { getPreference, createPreference, getFeedback, pay } = require("../controllers/payController");
const {Users, Carrito, Videogame, Stat} = require("../db.js");

const getPay = async (req, res) => {
    const {cartId, userId } = req.body
    try {
        const user = await Users.findByPk(userId)
        const cart = await Carrito.findByPk(cartId)
        const newCart = await pay(user, cart)
        res.status(200).json(newCart)
    } catch (error) {
        console.log(error)
    }
}

const postPay = async(req, res) => {
    try {
        let preference = await getPreference(req)
        console.log(preference);
        let newPreference = createPreference(preference, res)
        return newPreference
    } catch (error) {
        console.log(error)
    }
}

const getFeedPay = async(req, res) => {
    try {
        const feed = await getFeedback(req)
        res.status(200).JSON(feed)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getPay, postPay, getFeedPay}