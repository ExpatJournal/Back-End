const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/auth');
const journalRouter = require('./routes/journal');
const mediaRouter = require('./routes/media');
const publicRouter = require('./routes/public');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth/users', usersRouter);
server.use('/auth/journal', journalRouter);
server.use('/auth/media', mediaRouter);
server.use('/api', publicRouter);

server.get('/', (req, res) => {
  res.send('<h2>5x5</h5>');
});

module.exports = server;