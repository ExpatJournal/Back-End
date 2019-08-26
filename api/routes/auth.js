const express = require('express');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const mw = require('../middleware/middleware');

const Users = require('../models/users-model');

const router = express.Router();

router.post('/', mw.checkCredentials, (req, res) => {
  res.status(200).json({ message: 'yay!' });
});

router.post('/register', mw.checkCredentials, async (req, res) => {
  try {
    const user = await Users.add(req.user);
  
    if(user) {
      res.status(201).json(user);
    } else {
      res.status(500).json({ error: 'something went wrong adding the user to the database' })
    }
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

module.exports = router;