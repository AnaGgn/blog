const getArticles = "SELECT * FROM articles";
const getArticleById = "SELECT * FROM articles WHERE id = $1";
const addArticle = "INSERT INTO articles (title, description, content, id_user) VALUES ($1, $2, $3, $4)";
const removeArticleById = "DELETE FROM articles WHERE id = $1";
const updateArticle = "UPDATE articles SET title = $1, description = $2, content = $3, id_user = $4 WHERE id = $5";
const getLastArticles = "SELECT articles.*, (SELECT email FROM users WHERE articles.id_user = users.id) as user FROM articles ORDER BY articles.id DESC LIMIT 5";

module.exports = {
    getArticles,
    getArticleById,
    addArticle,
    removeArticleById,
    updateArticle,
    getLastArticles,
};