const { creteCart } = require('../controllers/createCart');
const { userCreate, getAllUsers } =  require('../controllers/userController')


const postUsers = async (req, res, next) => {
    const {
        userName, 
        userPassword, 
        userEmail, 
        userBirth,
        userImage,
    } = req.body;

    try {
        const newUser = await userCreate(userName, 
            userPassword, 
            userEmail, 
            userBirth)
        // const newCart = await cartCreate()
        const newCart = await creteCart(newUser)
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

const getUserByIdHandler = async(req, res, next) => {
    const {id} = req.params;
    try {
        const UserByIdH = await getUserById(id);
        res.status(200).json(UserByIdH)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}


module.exports =  { postUsers, getUsers, getUserByIdHandler }