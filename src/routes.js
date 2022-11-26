const express = require('express');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');

const router = express.Router();

router.get('/', homeController.index);
router.get('/about', homeController.about);

router.use('/cube', cubeController);

module.exports = router;