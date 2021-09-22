const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const addUser = "INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3)";
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";

module.exports = {
    checkEmailExists,
    addUser,
    getUsers,
    getUserById,
};