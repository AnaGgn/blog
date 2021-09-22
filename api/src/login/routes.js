const { Router } = require('express');
const controller = require('../user/controller');
const router = Router();

router.post('/', controller.loginUser);

module.exports = router;