const {addGames, getCart, getCarts} = require("../controllers/createCart")

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

const getAllCarts = async (req, res, next) => {
    try {
        const allCars = await getCarts();
        res.status(200).json(allCars)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

module.exports = {asocieVideoGames, getAllCarts}
