const router = require('express').Router();
const cubes = require('../db.json');


router.get('/', (req, res) => {
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