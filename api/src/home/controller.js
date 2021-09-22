const pool = require('../../db');
const articleQueries = require('../article/queries');

const getLastArticles = (req, res) => {
    pool.query( articleQueries.getLastArticles, (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getLastArticles,
};