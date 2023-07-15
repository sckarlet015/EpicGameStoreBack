const { Videogame, Platform, Developers, Genre, Users, Carrito} = require("../db.js");

const findVideogameByStatus = async (gameStatus) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              status: gameStatus,
            }
        });
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
}; 

const findVideogamesBySeller = async (sellerId) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              userId: sellerId
            }
          });
          return videogames;
    } catch (error) {
        throw new Error(error);
    };
}

const findAllVideogames = async () => {
    try {
        const videogames = await Videogame.findAll();
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
};

const findGameById = async (videogameId) => {
    try {
        console.log(videogameId);
        const videogame = await await Videogame.findOne({
            where: {
              id: videogameId,
            },
            include: [
              {
                model: Genre,
                attributes: ['genreName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Platform,
                attributes: ['platformName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Developers,
                attributes: ['id', 'name'],
              },
            ],
          });
        return videogame;
    } catch (error) {
        throw new Error(error);
    };
};

const findUserById = async(id) => {
  const UserById = await Users.findByPk(id, {
    include : [
        {model : Carrito},
        {model : Videogame, through: {attributes:[]}}
    ]
  });
  if(UserById) return UserById;
  return { message: `user not found` };
};

const findUserByStatus = async (userStatus) => {
  const users = await Users.findAll({
    where: {
      isActive: userStatus
    },
    include: [
      { model: Carrito },
      { model: Videogame, through: { attributes: [] } }
    ]
  });

  if(users) return users;
  return { message: `no hay usuarios`};
};

const findUserByRole = async (userRole) => {
  const users = await Users.findAll({
    where: {
      role: userRole
    },
    include: [
      { model: Carrito },
      { model: Videogame, through: { attributes: [] } }
    ]
  });

  if(users) return users;
  return { message: `no hay usuarios`};
};

module.exports = { 
    findVideogameByStatus,
    findVideogamesBySeller,
    findAllVideogames,
    findGameById,
    findUserById,
    findUserByRole,
    findUserByStatus
  }
