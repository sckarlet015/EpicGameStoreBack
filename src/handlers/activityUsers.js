const { creteCart } = require('../controllers/createCart');
const { userCreate, getAllUsers, getUserLogin,  getUserById, putUser } =  require('../controllers/userController')

const postUsers = async (req, res, next) => {
    const {
        userName, 
        userPassword, 
        userEmail, 
        userImage,
        
    } = req.body;
    console.log(req.body)
    try {
        const newUser = await userCreate(
            userName, 
             userPassword, 
             userEmail, 
             userImage,
             )
        const newCart = await creteCart(newUser)
       // console.log(newCart, newUser);
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
}


// const isActiveHandler = async (req, res, next) => {
//     const {id} = req.params;
//     const {isActiveBoolean} = req.body; 
//     try {
//         const userIsActive= await isActiveUser(id, isActiveBoolean);
//         res.status(200).json(userIsActive)
//     } catch (error) {
//         res.status(400).json({ error:error.message })
//     }
// }

// const putUserRoleHandler = async (req, res, next) => {
//     const {id} = req.params;
//     const {userRole} = req.body; 
//     try {
//         const roleUser= await putUserRole(id, userRole);
//         res.status(200).json(roleUser)
//     } catch (error) {
//         res.status(400).json({ error:error.message })
//     }
// }


const putUserHandler = async (req, res, next) => {
    const {id} = req.params;
    const {userName, userPassword, userEmail, userImage} = req.body; 
    try {
        const userPut= await putUser(id, userName, userPassword, userEmail, userImage);
        res.status(200).json(userPut)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}



module.exports =  { postUsers, getUsers, getUserByIdHandler, getUserLoginHandler, putUserHandler}