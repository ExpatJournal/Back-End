const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/auth');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth/users', usersRouter);

server.get('/', (req, res) => {
  res.send('<h2>5x5</h5>');
});

module.exports = server;