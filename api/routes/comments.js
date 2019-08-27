const express = require('express');

const mw = require('../middleware/middleware');

const Comments = require('../models/comments-model');

const router = express.Router();

router.get('/:id/comments', (req, res) => {
  
});

module.exports = router;