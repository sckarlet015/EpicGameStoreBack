const { Carrito, Videogame } = require("../db.js");

const cartCreate = async() => {
    let carrito = await Carrito.create()
    return carrito
}

const asociateCart = async(user, carrito) => {
try {
    await user.setCarrito(carrito)
} catch (error) {
    console.log(error)
}
}

const addGames = async(arrayGame, userID) => {
    try {
        for (let i=0;i< arrayGame.length ;i++)
        {
            const game =  await Videogame.findByPk({where: {id : arrayGame[i].id}})
            const user = await User.findByPk(userID, {
                include: Carrito,
              });
            const cart = await Carrito.findByPk({where: {id : user.Carrito.id}})
                if(game){
                    await game.addCarrito(cart)
                    }
                }
        return cart.id
    } catch (error) {
        console.log(error)
    }
}

const getCart = async(cartId) => {
    try {
        const allCartGames = await Cart.findAll(
            {include: VideogameCarrito}
        )
        return allCartGames
    } catch (error) {
        console.log(error);
    }
}

const getCarts = async() => {
    try {
        const allCartGames = await Carrito.findAll()
        return allCartGames
    } catch (error) {
        console.log(error);
    }
}

module.exports = {cartCreate, asociateCart, addGames, getCart, getCarts}