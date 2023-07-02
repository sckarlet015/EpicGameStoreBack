const { Carrito, Videogame, Users } = require("../db.js");

const creteCart = async(user) => {
    try {
        const newCart = await Carrito.create()
        await user.setCarrito(newCart)
        return newCart
    } catch (error) {
        console.log(error)
    }

}

const addGames = async(gameID, userID) => {
    try {
        const game =  await Videogame.findByPk(gameID)
        const user = await Users.findByPk(userID, {
            include: Carrito,
          });
          const cartId = user.Carrito.dataValues.id
          const cart = await Carrito.findByPk(cartId)
              if(game){
                  await game.addCarrito(cart)
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
          let infoVideoGames = Videogames.map((game) => {
            const newGame = {
                title : game.name,
                unit_price: game.price,
                id: game.id,
                quantity: 1
            }
            return newGame
          })

          const extractedData = {
            CartID: id,
            UserID: UserId,
            Videogames: infoVideoGames
          };
          
          return [extractedData];
    } catch (error) {
        console.log(error);
    }
}

const itemDeleteCart = async (gameID, cartID) => {
    try {
      const game = await Videogame.findByPk(gameID);
      const cart = await Carrito.findByPk(cartID);
      if (game && cart) {
        await game.removeCarrito(cart);
        return cart.id;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  

const deleteCart = async (cartID, userID) => {
    try {
      const cart = await Carrito.findByPk(cartID);
      if (cart) {
        await cart.update({ status: false });
        return cart.id
      } else {
        return false; 
      }
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  

module.exports = {creteCart, addGames, getCart, deleteCart, itemDeleteCart}