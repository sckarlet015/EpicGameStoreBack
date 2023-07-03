const { Users, Carrito } = require("../db.js");
//const bcrypt = require("bcryptjs")


const userCreate = async (userName, userPassword, userEmail, userImage) => {
let user = await Users.create({
                userName,
                userPassword, 
                userEmail, 
                userImage})
return user;
};

const getAllUsers = async () => {

    const allUsers = await Users.findAll(
        {
            include: [
                {model : Carrito},
                ]
        }
    )
return allUsers;
}


const getUserById = async (id) => {
    const UserById = await Users.findByPk(id, {
        include : [
            {model : Carrito},
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
      if (user.userPassword === password) {
        return user;
      } else {
        return false;
      }
    } else {
      return null;
    }
    
  };

module.exports = {userCreate, getAllUsers, getUserById, getUserLogin};


