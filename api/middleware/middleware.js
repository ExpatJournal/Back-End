const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const bcrypt = require('bcrypt');

module.exports = {
  checkCredentials
};

function checkCredentials(req, res, next) {
  let { username, password } = req.body;
  let error = 0;

  if( username === undefined || username.trim() === "" ) { error++; };
  if( password === undefined || password.trim() === "" ) { error = error + 2; };

  switch(error) {
    case 1:
      return res.status(400).json({ message: 'username is required' });
    case 2:
      return res.status(400).json({ message: 'password is required' });
    case 3:
      return res.status(400).json({ message: 'username and password is required' });
    default:
      password = getHash(password);
      req.user = { username, password };
      next();
  };
};

function getHash(toBeHashed) {
  return bcrypt.hashSync(toBeHashed, 14);
}