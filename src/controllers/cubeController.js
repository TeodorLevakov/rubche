const router = require('express').Router();

router.get('/create', (rec, res) => {
    res.render('create');
});


module.exports = router;