const {Users, Carrito, Videogame} = require("../db.js");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userCreate = async (userName, userPassword, userEmail, userImage) => {
const rounds = 8;
const passwordHash = await bcrypt.hash(userPassword, rounds);

const userByName = await Users.findOne({
  where: { userName: userName }
});

if(userByName) return {message : "Nombre en uso"};

const userByEmail = await Users.findOne({
  where: { userEmail: userEmail }
});

if(userByEmail) return {message : "Email en uso"};

let user = await Users.create({
                userName,
                userPassword : passwordHash, 
                userEmail, 
                userImage});
return user;
};

const adminCreate = async (userName, userPassword, userEmail) => {

  const rounds = 8;
  const passwordHash = await bcrypt.hash(userPassword, rounds);

  const adminCheck = await Users.findOne({ role: 'admin' });
  if(adminCheck) return {message: `admin already created`};

  let user = await Users.create({
    userName,
    userPassword : passwordHash, 
    userEmail, 
    role: `admin`
    });
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

const generateToken = (user) => {
  const payload = {
    id: user.id,
    userEmail: user.userEmail,
    role: user.role,
  };

  const options = {
    expiresIn: '4h',
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

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
      const token = generateToken(user);
      console.log(token); // Generate the JWT token
      return { user, token };
    } else {
      return false;
    }
  } else {
    return null;
  }; 
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
  };

const patchUserInfo = async (id, userId, updates) => {
  const newName = updates.userName;
  const newEmail = updates.userEmail;
  const newImage = updates.userImage;
  const newRole = updates.role;
  const newBirth = updates.birth;
  const newActive = updates.active; 
  const user = await Users.findByPk(userId);
  const userToChange = await Users.findByPk(id);
  const userRole = user.role;
  const updateFields = {};

  if (id !== userId && userRole !== 'admin') return 'invalid request';
    
  if (newName) {
    const userByName = await Users.findOne({
      where: { userName: newName }
    });
    if (userByName) return 'nombre en uso';
    updateFields.userName = newName;
  };

  if (newEmail) {
    const userByEmail = await Users.findOne({
      where: { userEmail: newEmail }
    });
    if (userByEmail) return 'email en uso';
    updateFields.userEmail = newEmail;
  }

  if (newImage) updateFields.userImage = newImage;


  if(userRole === `admin`){
    if (newRole) updateFields.role = newRole;
    if (newBirth) updateFields.userBirth = newBirth;
    if (newActive !== undefined) updateFields.isActive = newActive;
  }else{
    if (newRole) updateFields.role = 'vendedor';
    if (newActive) updateFields.isActive = false;
  };

  console.log(updateFields);
  await userToChange.update(updateFields);
  const updatedUser = await Users.findByPk(id);
  return updatedUser;
};

const getByEmail = async (email) => {
  const user = await Users.findOne({
    where: { userEmail: email },
    include: {
      model: Carrito,
    }
  });
  console.log(user);
  if(user) return user 

  return null;
}

const getByEmailRegister = async(email) => {
  const user = await Users.findOne({
    where: { userEmail: email }
  })
  if(user) return false
  else{
    return true
  }
}

module.exports = {userCreate, getAllUsers, getUserById, getUserLogin, putUser, patchUserInfo, getByEmail, getByEmailRegister, adminCreate};


