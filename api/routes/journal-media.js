const express = require('express');

const mw = require('../middleware/middleware');

const Media = require('../models/media-model');

const router = express.Router();

router.get('/:id/media', async (req, res) => {
  try {
    const { id } = req.params;
    
    const media = await Media.find(id);
    
    if(media.length > 0) {
      res.status(200).json(media);
    } else {
      res.status(404).json({ error: 'there is no media for this post' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was a problem getting the media for this post' });
  };
});

router.post('/:id/media', mw.restricted, mw.mediaCheck, async (req, res) => {
  try {
    const owner_id = req.user.id;
    req.media.owner_id = owner_id;
    const media = await Media.add(req.media);
    const linking = await Media.addConnect(parseInt(req.params.id), media.id);
    if(linking) {
      res.status(201).json(media);
    } else {
      res.status(400).json({ error: 'something went wrong' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong adding media to database' });
  };
});

router.put('/:id/media/:mid', mw.restricted, mw.mediaCheck, async (req, res) => {
  try {
    const id = req.params.mid;
    req.media.owner_id = req.user.id;
  
    const updated = await Media.update(req.media, id);
    if(updated) {
      res.status(200).json(updated);
    } else {
      res.status(500).json({ error: 'there was a problem updating the database' })
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong updating the database' })
  }
});

router.delete('/:id/media/:mid', mw.restricted, async (req, res) => {
  try {
    const mediaId = parseInt(req.params.mid);
    const deleted = await Media.removeConn(mediaId);
    if(deleted) {
      const removed = await Media.remove(mediaId);
      if(removed) {
        res.status(204).end();
      } else {
        res.status(400).json({ error: 'media removed from post but still in database' });
      }
    } else {
      res.status(400).json({ error: 'there was a problem removing media from database' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong trying to delete media from database' });
  }
});

module.exports = router;