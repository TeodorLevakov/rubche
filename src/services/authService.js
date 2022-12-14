const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { saltRound, secret } = require('../config/constants.js');


exports.register = async (username, password, repeatPassword) => {

    if (password !== repeatPassword) {
        return;
    }

    let hashPass = await bcrypt.hash(password, saltRound);

    let createdUser = await User.create({
        username,
        password: pass
    });

    return createdUser;
    // let createdUser = new User({
    //     username,
    //     password: hashPass
    // });
    // createdUser.save();
};

exports.login = async ({username, password}) => {
    let user = await User.findOne({username});
    
    if (!user) {
        return;
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        return;
    }

    const jwtPromise = promisify(jwt.sign);
    let token = await jwtPromise({_id: user._id, username: user.username}, secret);
    // let result = new Promise((resolve, reject) => {
    //     jwt.sign({_id: user._id, username: user.username}, secret, {expiresIn: '1d'}, (err, token) => {
    //         if (err) {
    //            return reject(err);
    //         }
    //         resolve(token);
    //     });
    // });
    
    // return result;
    return token;
}