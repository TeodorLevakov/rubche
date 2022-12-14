const fs = require('fs/promises');
const path = require('path');
const Accessory = require('../models/Accessory.js');

//const cubes = require('../db.json');
const Cube = require('../models/Cube.js');

exports.create = (cube) => {
    // cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});
    // let data = JSON.stringify(cubes, '', 4);
    // return fs.writeFile(path.resolve('src', 'db.json'), data, { encoding: 'utf-8'})   

    return Cube.create(cube);
}

exports.edit = (cubeId, cubeData) => {
    return Cube.findByIdAndUpdate(cubeId, cubeData);
}

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.getOne = (id) => Cube.findById(id);

exports.getOneDetailt = (id) => Cube.findById(id).populate('accessories');

exports.getAll = async (search = '', fromInput, toInput) => {
    let from = Number(fromInput) || 0;
    let to = Number(toInput) || 6;

    let cubes = await Cube.find({ name: { $regex: new RegExp(search, 'i')}})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

    // let cubes = await Cube.find(
    //     {
    //         name: { $regex: new RegExp(search, 'i')},
    //         difficultyLevel: { $ant: [{ $gta: from}, { $lte: to}]}
    //     })
    // .lean();

     
    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

    return cubes;
};

exports.attachAccess = async (cubeId, accessId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}

