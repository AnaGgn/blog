const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getArticles);
router.post('/', controller.addArticle);
router.get('/:id', controller.getArticleById);
router.put('/:id', controller.updateArticle);
router.delete('/:id', controller.removeArticle);

module.exports = router;