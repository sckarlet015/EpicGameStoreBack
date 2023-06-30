const {addGames, getCart} = require("../controllers/createCart")

const asocieVideoGames = async(req, res) => {
    const {
        arrayGames,
        userId
    } = req.body;

    try {
       const cartId = await addGames(arrayGames, userId)
       const getAllCart = await getCart(cartId)
       return getAllCart
    } catch (error) {
        console.log(error)
    }
}

module.exports = {asocieVideoGames}
