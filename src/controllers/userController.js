const { Users, Carrito } = require("../db.js");


const userCreate = async (userName, userPassword, userEmail, userBirth, userImage) => {
let user = await Users.create({
                userName,
                userPassword, 
                userEmail, 
                userBirth,
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



module.exports = {userCreate, getAllUsers, getUserById};
