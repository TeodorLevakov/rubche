const router = require('express').Router();
const cubesService = require('../services/cubeService');


router.get('/', async (req, res) => {
    let { search, from, to } = req.query;

    let cubes = await cubesService.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
// exports.index = (req, res) => {
//     res.render('index', { cubes });
// };

// exports.about = (req, res) => {
//     res.render('about');
// };