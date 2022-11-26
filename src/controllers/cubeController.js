const router = require('express').Router();
const cubeService = require('../services/cubeService');


router.get('/create', (rec, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;

    if (cube.name.length < 2) {
        res.status(400).send('Invalid request');
        return;
    };

    cubeService.save(cube)
        .then(() => {
            res.redirect('/');
        }).catch(err => {
            res.status(400).send(err);
        });
    // try {
    //     await cubeService.save(cube);
    //     res.redirect('/');
    // } catch (err) {
    //     res.status(400).send(err);
    // }
    
});

router.get('/details/:id', (req, res) => {
    let cube = cubeService.getOne(req.params.id);
    
    res.render('details', {cube});
});


module.exports = router;