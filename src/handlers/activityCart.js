const {addGames, getCart, getCarts} = require("../controllers/createCart")

const asocieVideoGames = async(req, res) => {
    const {
        arrayGames,
        userId
    } = req.body;

    try {
       const cartId = await addGames(arrayGames, userId)
       const getAllCart = await getCart(cartId)
       res.status(200).json(getAllCart)
    } catch (error) {
        console.log(error)
    }
}

const getAllCarts = async (req, res, next) => {
    try {
        console.log("si se utiliza el getAll")
        const allCars = await getCarts();
        console.log(allCars);
        res.status(200).json(allCars)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

module.exports = {asocieVideoGames, getAllCarts}
