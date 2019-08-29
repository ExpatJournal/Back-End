const express = require('express');

const mw = require('../middleware/middleware');

const Posts = require('../models/journal-model');
const Media = require('../models/media-model');

const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    const offset = req.query.offset * limit || 0;

    let posts = await Posts.find(limit, offset);
    for(let i=0; i<posts.length; i++) {
      let media = await Media.find(posts[i].id);
      posts[i].media = media;
    }

    if(posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: 'there are currently no posts' });
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong getting posts from the database' });
  };
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    let post = await Posts.findById(id);
    let media = await Media.find(post.id);
    post.media = media;
  
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'the post you are looking for does not exist' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was an error getting the post from the database' });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const limit = req.query.limit || 20;
    const offset = req.query.offset * limit || 0;
  
    let posts = await Posts.findBy({ author_id: id }, limit, offset);

    for(let i=0; i<posts.length; i++) {
      let media = await Media.find(posts[i].id);
      posts[i].media = media;
    }

    if(posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: 'user has no posts' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'someting went wrong' });
  }
});

module.exports = router;