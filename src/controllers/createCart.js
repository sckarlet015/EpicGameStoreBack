const { Carrito, Videogame, Users, VideogameCarrito } = require("../db.js");

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
        var cart;
        for (let i=0;i< arrayGame.length ;i++)
        {
            const game =  await Videogame.findByPk(arrayGame[i].id)
            const user = await Users.findByPk(userID, {
                include: Carrito,
              });
              const cartId = user.Carrito.dataValues.id
            cart = await Carrito.findByPk(cartId)
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
        const allCartGames = await Carrito.findByPk(cartId, {
            include: Videogame,
          });

          const { id, UserId, Videogames } = allCartGames;

          const extractedData = {
            id: id,
            UserId: UserId,
            Videogames: Videogames
          };
          
          return [extractedData];
        const allCartGame = await Cart.findAll(
            {include: VideogameCarrito}
        )
        return allCartGame
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