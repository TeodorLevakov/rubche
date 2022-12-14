const express = require('express');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController.js');
const authController = require('./controllers/authController');

const router = express.Router();

router.use('/', homeController);
//router.get('/about', homeController.about);

router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/auth', authController);
router.use('*', (req, res) => {
    res.render('404')
});

module.exports = router;