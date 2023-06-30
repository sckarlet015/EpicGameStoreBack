const {addGames, getCart} = require("../controllers/createCart")

const asocieVideoGames = async(req, res) => {
    const {
        arrayGames,
        userId
    } = req.body;

    try {
        console.log(arrayGames, userId);
       const cartId = await addGames(arrayGames, userId)
       console.log(cartId);
       const getAllCart = await getCart(cartId)
       console.log(getAllCart);
       return getAllCart
    } catch (error) {
        console.log(error)
    }
}

module.exports = {asocieVideoGames}
