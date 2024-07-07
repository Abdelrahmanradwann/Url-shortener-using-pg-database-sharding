const express = require('express');
const router = express.Router();
const controller = require('./controllers')


router.get('/:urlId', controller.getUrl);

router.post('/', controller.add);

module.exports = router