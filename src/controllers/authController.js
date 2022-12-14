const router = require('express').Router();
const authService = require('../services/authService');
const { sessionName } = require('../config/constants.js')

router.get('/register', (req, res) => {

    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const { username, password, repeatPassword } = req.body;

    let createdUser = await authService.register(username, password, repeatPassword);

    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        res.redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);

    if (!token) {
        return res.redirect('/404');
    }

    res.cookie(sessionName, token, { httpOnly: true});

    res.redirect('/');
});
 
router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});


module.exports = router;