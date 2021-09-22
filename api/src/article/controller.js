const pool = require('../../db');
const queries = require('./queries.js');

const getArticles = (req, res) => {
    pool.query( queries.getArticles, (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
};

const getArticleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query( queries.getArticleById, [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
};

const addArticle = (req, res) => {
    const {title, description, content, user} = req.body;
    pool.query( queries.addArticle, [title, description, content, user], (err, results) => {
        if(err) throw err;
        res.status(201).json('Article has been created');
        console.log('Article has been created');
    })
};


const removeArticle = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query( queries.getArticleById, [id], (err, results) => {
        if(!results.rows.length){
            res.send('This article does not exist, could not delete it.');
        } else {
            pool.query( queries.removeArticleById, [id], (err, results) => {
                if(err) throw err;
                res.status(200).json('Article removed');
            })
        }
    })
};

const updateArticle = (req, res) => {
    const id = parseInt(req.params.id);
    const {title, description, content, user} = req.body;

    pool.query( queries.getArticleById, [id], (err, results) => {
        if(!results.rows.length){
            res.send('This article does not exist, could not update it.');
        } else {
            pool.query( queries.updateArticle, [title, description, content, user, id], (err, results) => {
                if(err) throw err;
                res.status(200).json('Article has been updated');
                console.log('Article has been updated');
            })
        }
    })
};

module.exports = {
    getArticles,
    getArticleById,
    addArticle,
    removeArticle,
    updateArticle,
};