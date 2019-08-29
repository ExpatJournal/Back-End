const express = require('express');

const mw = require('../middleware/middleware');

const Posts = require('../models/journal-model');
const Media = require('../models/media-model');

const router = express.Router();

router.get('/', mw.restricted, async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset * limit || 0;

  try {
    let posts = await Posts.findBy({ author_id: req.user.id }, limit, offset);

    for(let i=0; i<posts.length; i++) {
      let media = await Media.find(posts[i].id);
      posts[i].media = media;
    }

    if(posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: 'user has no posts' });
    }
  }
  catch (err) {
    res.status(500).json({ error: 'something went wrong retreiving the journal entries' });
  };
});

router.get('/:id', mw.restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const limit = req.query.limit || 20;
    const offset = req.query.offset * limit || 0;
    
    const post = await Posts.findById(id, limit, offset);
    const media = await Media.find(id);
    post.media = media;
    
    if(post) {
      if(post.author_id === req.user.id) {
        res.status(200).json(post);
      } else {
        res.status(401).json({ error: 'this is not your post' });
      }
    } else {
      res.status(404).json({ error: 'the post you are searching for does not exist' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong retrieving the post from the database' });
  };
});

router.post('/', mw.restricted, mw.postCheck, async (req, res) => {
  try {
    const now = Date.now();
    req.post = {
      ...req.post,
      created_date: now,
      updated_date: now
    };
    const post = await Posts.add(req.post);
    res.status(201).json(post);
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong adding post to database' });
  };
});

router.put('/:id', mw.restricted, mw.postCheck, async (req, res) => {
  const { id } = req.params;
  
  try {
    const now = Date.now();
    req.post = {
      ...req.post,
      updated_date: now
    };
    const post = await Posts.update(req.post, id, req.user.id);
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ error: 'you do not have permission to edit this post' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong adding post to database' });
  };
});

router.delete('/:id', mw.restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Posts.remove(id, req.user.id);
    if(deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'you cannot delete this post' });
    };
  }
  catch(err) {
    res.status(500).json(err)//{ error: 'there was a problem deleteing the post from the database' });
  };
});

module.exports = router;