const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const mw = require('../middleware/middleware');

const Users = require('../models/users-model');

const router = express.Router();

router.post('/login', mw.checkCredentials, (req, res) => {
  const { username, password } = req.user;

  Users.loginFindBy({ username })
        .first()
        .then(user => {
          if(user && bcrypt.compareSync(password, user.password)) {
            const token = getToken(user);

            res.status(200).json({
              username: user.username,
              token
            });
          } else {
            res.status(401).json({ error: 'invalid credentials' });
          };
        })
        .catch(err => {
          res.status(500).json({ error: 'there was an error trying to login' });
        });
});

router.post('/register', mw.checkCredentials, async (req, res) => {
  try {
    req.user.password = getHash(req.user.password);

    const user = await Users.add(req.user);

    res.status(201).json(user);
  }
  catch(err) {
    const { username } = req.user;
    const checkUser = await Users.findBy({ username });

    if(checkUser) {
      res.status(409).json({ error: 'user already exists' });
    } else {
      res.status(500).json({ error: 'something went wrong adding user to database' });
    }
  };
});

function getHash(toBeHashed) {
  return bcrypt.hashSync(toBeHashed, 14);
};

function getToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;