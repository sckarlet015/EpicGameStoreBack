const { creteCart } = require('../controllers/cartController');
const {userCreate,  getUserById, getUserLogin,  patchUserInfo, adminCreate } =  require('../controllers/userController')

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
        res.status(400).json({ error:error.message });
    };
};

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
    console.log(req.body);
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

const getUserByEmail = async(req,res) => {
    try {
        const { email } = req.params;
        const response = await getByEmail(email);

        if(response){
            res.status(200).json(response);
        }else{
            res.status(400).json({error: response.message})
        }
    } catch (error) {
        res.status(400).json({ error:error.message })
    }

}

const getUserEmailRegister = async(req, res) => {
    try {
        const { email } = req.params;
        const response = await getByEmailRegister(email);
        if(response){
            res.status(200).json(response)
        } else {
            res.status(400).json({error: response.message})
        };
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

const createAdmin = async(req,res) => {
    const {
        userName, 
        userPassword, 
        userEmail, 
    } = req.body;
    try {
        const response = await adminCreate(
            userName, 
            userPassword, 
            userEmail
        );
        if(response.message){
            res.status(400).json({error: response.message});
        }else{
            res.status(200).json(response);
        }
    } catch (error) {
        
    }
}

module.exports =  { postUsers, getUserByIdHandler, getUserLoginHandler, patchUser, getUserByEmail, getUserEmailRegister, createAdmin }