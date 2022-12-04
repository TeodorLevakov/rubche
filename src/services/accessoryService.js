const Accessory = require('../models/Accessory');

exports.create = (accessData) => Accessory.create(accessData);

exports.getAll = () => Accessory.find();
