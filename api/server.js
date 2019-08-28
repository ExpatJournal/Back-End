const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/auth');
const journalRouter = require('./routes/journal');
const journalMediaRouter = require('./routes/journal-media');
const mediaRouter = require('./routes/media');
const commentRouter = require('./routes/comments');
const publicRouter = require('./routes/public');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth/users', usersRouter);
server.use('/auth/journal', journalRouter);
server.use('/auth/journal', journalMediaRouter);
server.use('/auth/journal', commentRouter);
server.use('/auth/media', mediaRouter);
server.use('/auth/comments', commentRouter);
server.use('/api', publicRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h2>5x5</h2>');
});

module.exports = server;