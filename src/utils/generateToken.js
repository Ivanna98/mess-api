const jwt = require('jsonwebtoken');
const { secretKey, jwtExpiration } = require('../config');

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, secretKey, { expiresIn: jwtExpiration },
    (err, token) => {
      if (err) {
        reject(Error('Error token'));
      }
      resolve(token);
    });
});

module.exports = generateToken;
