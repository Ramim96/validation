//Import packages
const jwt = require('jsonwebtoken');

//Generation of jwt token method
const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT, {expiresIn: ((60 * 60) * 24) * 2});
}

module.exports = generateToken;