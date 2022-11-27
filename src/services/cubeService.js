const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

exports.save = (cube) => {

    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});
    let data = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), data, { encoding: 'utf-8'})   
}

exports.getOne = (id) => cubes[id];

