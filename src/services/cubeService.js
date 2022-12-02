const fs = require('fs/promises');
const path = require('path');

//const cubes = require('../db.json');
const Cube = require('../models/Cube.js');

exports.create = (cube) => {
    // cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});
    // let data = JSON.stringify(cubes, '', 4);
    // return fs.writeFile(path.resolve('src', 'db.json'), data, { encoding: 'utf-8'})   

    return Cube.create(cube);
}

exports.getOne = (id) => Cube.findById(id);

exports.getAll = async (search = '', fromInput, toInput) => {

    return await Cube.find().lean();
    // let from = Number(fromInput) || 0;
    // let to = Number(toInput) || 6;
    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

    // return result;
};

