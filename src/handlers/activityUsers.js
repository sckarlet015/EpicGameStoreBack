const { cartCreate, asociateCart } = require('../controllers/createCart');
const { userCreate, getAllUsers } =  require('../controllers/userController')

const postUsers = async (req, res, next) => {
    const {
        userName, 
        userPassword, 
        userEmail, 
        userBirth
    } = req.body;

    try {
        const newUser = await userCreate(userName, 
            userPassword, 
            userEmail, 
            userBirth)
        const newCart = await cartCreate()
        asociateCart(newUser, newCart)
        res.status(200).json({newUser, newCart})
    }catch(error){
        res.status(400).json({ error:error.message })
        console.log(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

module.exports =  { postUsers, getUsers }