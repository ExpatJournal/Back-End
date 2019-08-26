const express = require('express');

const mw = require('../middleware/middleware');

const Posts = require('../models/journal-model');

const router = express.Router();

router.get('/', mw.restricted, async (req, res) => {
  try {
    const posts = await Posts.find(req.user.id);
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
  const { id } = req.params;
  try {
    const post = Posts.findById(id);
    if(post.length > 0) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'the post you are searching for does not exist' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong retrieving the post from the database' });
  }
})

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
      res.status(404).json({ error: 'the post you are trying to update does not exist' });
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
    res.status(500).json({ error: 'there was a problem deleteing the post from the database' });
  };
});

module.exports = router;