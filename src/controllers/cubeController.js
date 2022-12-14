const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (rec, res) => {
    res.render('create');
});

router.post('/create', isAuth, (req, res) => {
    const cube = req.body;
    cube.owner = req.user._id;

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
    let cube = await cubeService.getOneDetailt(req.params.id).lean();
    let isOwner = cube.owner == req.user?._id
    res.render('details', {cube, isOwner});
});

router.get('/:cubeId/attach', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllWithout(cube.accessories).lean();

    res.render('accessory/attach', { cube, accessories});
});

router.post('/:cubeId/attach', async (req, res) => {
    const accesId = req.body.accessory;

    await cubeService.attachAccess(req.params.cubeId, accesId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (cube.owner != req.user._id){
        return res.redirect('/404');
    }

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/edit', {cube});
});

router.post('/:cubeId/edit', async (req, res) => {

    let modyCube = await cubeService.edit(req.params.cubeId, req.body);
   
    res.redirect(`/cube/details/${modyCube._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    res.render('cube/delete', {cube});
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});



module.exports = router;