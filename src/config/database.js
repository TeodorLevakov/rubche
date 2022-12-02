const mongoose = require('mongoose');

const connectionStr = 'mongodb://0.0.0.0.27017';

exports.initDB = () => mongoose.connect(connectionStr);


