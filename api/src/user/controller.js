const pool = require('../../db');
const queries = require('./queries.js');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const addUser = async (req, res) => {
    const {email, password} = req.body;
    const hash = await argon2.hash(password);

    pool.query( queries.checkEmailExists, [email], (err, results) => {
        if(results.rows.length){
            res.send("This email is already link to an account");
        } else {
            
            const userAdmin = req.body.isAdmin ? req.body.isAdmin : false;
            pool.query( queries.addUser, [email, hash, userAdmin], (err, results) => {
                if(err) throw err;
                res.status(201).json('User has been created');
                console.log('User has been created');
            })
        }
    })
};

const getUsers = (req, res) => {
    pool.query( queries.getUsers, (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

        pool.query(queries.checkEmailExists, [email], async (err, results) => {
            if(!results.rows.length){
                res.send("Please create an account before login");
            } else {
                const user = results.rows[0];
                const passwordIsCorrect = await argon2.verify(user.password, password);
                if(passwordIsCorrect){
                    const data = { email: user.email, id: user.id };
                    const token = jwt.sign(data, JWT_PRIVATE_KEY, { expiresIn: '24h' });
                    const result = { id: user.id, token: token, isAdmin: user.is_admin};
                    console.log('result: ', result);
                    res.send(result);
                }else{
                    res.send("Wrong password");
                }
            }
        });

};


const findById = async (id) => {
    return new Promise(resolve => {
        pool.query( queries.getUserById, [id], (err, results) => {
            if(err) throw err;
            resolve(results.rows[0]);
        })  
    })
}

module.exports = {
    addUser,
    getUsers,
    loginUser,
    findById,
};