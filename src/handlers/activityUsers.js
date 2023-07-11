const { creteCart } = require('../controllers/cartController');
const {userCreate, getAllUsers, getUserById, getUserLogin, putUser, patchUserInfo } =  require('../controllers/userController')

const postUsers = async (req, res, next) => {
    const {
        userName, 
        userPassword, 
        userEmail, 
        userImage,
    } = req.body;

    try {
        const newUser = await userCreate(
            userName, 
            userPassword, 
            userEmail, 
            userImage,)
        const newCart = await creteCart(newUser)
        res.status(200).json({newUser, newCart})
    }catch(error){
        res.status(400).json({ error:error.message })
    }
}

const getUsers = async (req, res, next) => {
    try {
        console.log(req.user);
        const role = req.user.role;
        
        if(role === `admin`){
            const allUsers = await getAllUsers();
            res.status(200).json(allUsers);
        }else{
            res.status(403).json("invalid request");
        }
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
const getUserLoginHandler = async (req, res, next) => {
    const userNull= 'Usuario no encontrado';
    const passwordError= 'Contraseña incorrecta';
    const {email, password} = req.body;
    try {
        const getLoginH = await getUserLogin(email, password);
        if(getLoginH===null){res.status(400).json(userNull)}
        else if(getLoginH===false)res.status(401).json(passwordError)
        else res.status(200).json(getLoginH)
        
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
};

const patchUser = async (req, res) => {
    try {
        const userId = req.user.id
        const { id } = req.params;
        const updates = req.body;
        const response = await patchUserInfo(id, userId, updates);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
};

module.exports =  { postUsers, getUsers, getUserByIdHandler, getUserLoginHandler, patchUser }