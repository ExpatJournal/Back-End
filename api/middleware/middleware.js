const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = {
  restricted,
  checkCredentials
};

function checkCredentials(req, res, next) {
  let { username, password } = req.body;
  let displayName = username;
  username = username.toLowerCase();
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
      req.user = { username, displayName, password };
      next();
  };
};

function restricted(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);

  if(token) {
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        req.user = {
          username: decodedToken.username,
        };
        next();
      };
    });
  } else {
    res.status(400).json({ error: 'Auth token required' });
  }
}