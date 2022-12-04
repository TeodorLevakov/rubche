const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (rec, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;

    if (cube.name.length < 2) {
        res.status(400).send('Invalid request');
        return;
    };

    cubeService.create(cube)
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

router.get('/details/:id', async (req, res) => {
    let cube = await cubeService.getOne(req.params.id).lean();
    
    res.render('details', {cube});
});

router.get('/:cubeId/attach', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean();

    res.render('accessory/attach', { cube, accessories});
});

router.post('/:cubeId/attach', async (req, res) => {
    const accesId = req.body.accessory;

    await cubeService.attachAccess(req.params.cubeId, accesId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});


module.exports = router;