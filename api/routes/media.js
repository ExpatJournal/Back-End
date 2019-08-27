const express = require('express');

const mw = require('../middleware/middleware');

const Media = require('../models/media-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const media = await Media.findAll();
    if(media.length > 0) {
      res.status(200).json(media);
    } else {
      res.status(404).json({ error: 'there is no media for this post' })
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was an error getting media for this post' });
  };
});

router.get('/:id', async (req, res) => {
const { id } = req.params;

  try{
    const media = await Media.findById(id);
    if(media.length > 0) {
      res.status(200).json(media);
    } else {
      res.status(404).json({ error: 'there is no media for this post' })
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was an error getting media for this post' });
  };
});

module.exports = router;