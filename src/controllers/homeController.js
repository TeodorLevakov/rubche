const router = require('express').Router();
const cubesService = require('../services/cubeService');


router.get('/', (req, res) => {
    let { search, from, to } = req.query;

    let cubes = cubesService.getAll(search, Number(from), Number(to));
    res.render('index', { cubes });
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