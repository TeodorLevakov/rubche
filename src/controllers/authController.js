const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {

    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const { username, password, repeatPassword } = req.body;

    let createdUser = await authService.register(username, password, repeatPassword);

    console.log(createdUser);

    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        //res.redirect();
        res.redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {

});



module.exports = router;