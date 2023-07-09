const {Users, Carrito, Videogame} = require("../db.js");
const bcrypt = require("bcryptjs");
const rounds = 8;
const passwordHash = await bcrypt.hash(userPassword, rounds);

const userCreate = async (userName, userPassword, userEmail, userImage) => {
let user = await Users.create({
                userName,
                userPassword : passwordHash, 
                userEmail, 
                userImage})
return user;
};

const getAllUsers = async () => {

    const allUsers = await Users.findAll(
        {
            include: [
                {model : Carrito},
                {model : Videogame, through: {attributes:[]}}
                ]
        }
    )
return allUsers;
}


const getUserById = async (id) => {
  const UserById = await Users.findByPk(id, {
      include : [
          {model : Carrito},
          {model : Videogame, through: {attributes:[]}}
      ]
  })
return UserById;
}


const getUserLogin = async (email, password) => {
  const user = await Users.findOne({
    where: {
      userEmail: email,
    },
    include: {
      model: Carrito,
    },
  });

  if (user && user.isActive === true) {
    const passwordMatch= await bcrypt.compare(password, user.userPassword)
    if (passwordMatch) {
      return user;
    } else {
      return false;
    }
  } else {
    return null;
  }
  
};
const putUser = async (id, userName, userPassword, userEmail, userImage) => {

  await Users.update({
    userName,
    userPassword,
    userEmail,
    userImage,
    }, {
    where: {
        id:id
    }
    });
    return 'Usuario actualizado'
  }

module.exports = {userCreate, getAllUsers, getUserById, getUserLogin, putUser};


