const Accessory = require('../models/Accessory');

exports.create = (accessData) => Accessory.create(accessData);

exports.getAll = () => Accessory.find();

exports.getAllWithout = (ids) => Accessory.find({_id: {$nin: ids}});
