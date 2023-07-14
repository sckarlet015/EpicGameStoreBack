const { getAllUsers } = require('../controllers/userController')

const getUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

module.exports = {
    getUsers
}