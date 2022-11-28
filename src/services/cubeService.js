const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

exports.save = (cube) => {

    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});
    let data = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), data, { encoding: 'utf-8'})   
}

exports.getOne = (id) => cubes.find(x =s> x.id == id);

exports.getAll = (search = '', fromInput, toInput) => {
    let from = Number(fromInput) || 0;
    let to = Number(toInput) || 6;
    const result = cubes
        .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

    return result;
};

