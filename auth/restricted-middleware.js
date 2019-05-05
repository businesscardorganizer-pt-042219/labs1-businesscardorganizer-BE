const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secret.js');

module.exports = (req, res, next) => {
 const token = req.headers.authorization;

 if (token) {
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ err: 'user not verified'});
    } else {
      console.log('token confirmed', decodedToken);
      req.decodedJwt = decodedToken;
      req.username=decodedToken.username;
      req.id=decodedToken.subject;
      next();
    }
  });
 } else {
   res.status(401).json({ err: 'user not verified'});
 }
};

