const User = require('../models/User');
const bcrypt = require('bcrypt');


const saltRound = 10;

exports.register = async (username, password, repeatPassword) => {

    if (password !== repeatPassword) {
        return;
    }

    let hashPass = await bcrypt.hash(password, saltRound);

    // let createdUser = await User.create({
    //     username,
    //     password: pass
    // });
    let createdUser = new User({
        username,
        password: hashPass
    });
    createdUser.save();

    return createdUser;
}