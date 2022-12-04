const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^https?/g,
            // validator: function() {
            //     return this.imageUrl.startsWith('http')
            // },
            message: 'img url should start with http/s'
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: 120
    },
    cube: {
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }
});

const Accessory = mongoose.model('Accessory', accessSchema);

module.exports = Accessory;
