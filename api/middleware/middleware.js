const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = {
  restricted,
  checkCredentials,
  checkRegisterCredentials,
  postCheck
};

function checkRegisterCredentials(req, res, next) {
  let { username, password, email } = req.body;
  let displayName = username;
  let error = 0;

  if( username === undefined || username.trim() === "" ) { error++; }
  else { username = username.toLowerCase(); };
  if( password === undefined || password.trim() === "" ) { error = error + 2; };
  if( email === undefined || email.trim() === "") { error = error + 4; }
  else {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error = error + 8;
    }
  }

  switch(error) {
    case 1:
      return res.status(400).json({ error: 'username is required' });
    case 2:
      return res.status(400).json({ error: 'password is required' });
    case 3:
      return res.status(400).json({ error: 'username and password is required' });
    case 4:
      return res.status(400).json({ error: 'email is required' });
    case 5:
      return res.status(400).json({ error: 'username and email are required' });
    case 6:
      return res.status(400).json({ error: 'password and email are required' });
    case 7:
      return res.status(400).json({ error: 'username, password, and email are required' });
    case 8:
      return res.status(400).json({ error: 'email address is invalid' });
    case 9:
      return res.status(400).json({ error: 'username is required and email is invalid' });
    case 10:
      return res.status(400).json({ error: 'password is required and email is invalid' });
    case 11:
      return res.status(400).json({ error: 'username and password are required. email is invalid.' });
    default:
      req.user = { username, displayName, email,  password };
      next();
  };
};

function checkCredentials(req, res, next) {
  let { username, password } = req.body;
  let displayName = username;
  username = username.toLowerCase();
  let error = 0;

  if( username === undefined || username.trim() === "" ) { error++; };
  if( password === undefined || password.trim() === "" ) { error = error + 2; };
  if( email === undefined || email.trim() === "") { error = error + 4; }

  switch(error) {
    case 1:
      return res.status(400).json({ error: 'username is required' });
    case 2:
      return res.status(400).json({ error: 'password is required' });
    case 3:
      return res.status(400).json({ error: 'username and password is required' });
    case 4:
      return res.status(400).json({ error: 'email is required' });
    case 5:
      return res.status(400).json({ error: 'username and email are required' });
    case 6:
      return res.status(400).json({ error: 'password and email are required' });
    case 7:
      return res.status(400).json({ error: 'username, password, and email are required' });
    default:
      req.user = { username, displayName, email,  password };
      next();
  };
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ error: 'Not Authorized' });
      } else {
        req.user = {
          username: decodedToken.username,
          id: decodedToken.subject
        };
        next();
      };
    });
  } else {
    res.status(400).json({ error: 'Auth token required' });
  };
};

function postCheck(req, res, next) {
  const{ title, location, post } = req.body;
  let error = 0;

  if( title === undefined || title.trim() === "") { error++; };
  if( location === undefined || location.trim() === "") { error = error + 2; };
  if( post === undefined || post.trim() === "") { error = error + 4; };

  switch(error) {
    case 1:
      return res.status(400).json({ error: 'post title required' });
    case 2:
      return res.status(400).json({ error: 'post location is required' });
    case 3:
      return res.status(400).json({ error: 'post title and location are required' });
    case 4:
      return res.status(400).json({ error: 'post content is required' });
    case 5:
      return res.status(400).json({ error: 'post title and content are required' });
    case 6:
      return res.status(400).json({ error: 'post location and content are required' });
    case 7:
      return res.status(400).json({ error: 'post title, location, and content are required' });
    default:
      req.post = {
        title,
        author_id: req.user.id,
        location,
        post
      };
      next();
  };
};