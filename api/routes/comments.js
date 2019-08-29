const express = require('express');

const mw = require('../middleware/middleware');

const Comments = require('../models/comments-model');

const router = express.Router();

router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comments.find(id);
    res.status(200).json(comments);
  }
  catch(err) {
    res.status(500).json({ error: 'something went wrong getting comments from database' });
  }
});

router.post('/:id/comments', mw.restricted, mw.commentCheck, async (req, res) => {
  try {
    const postId = req.params.id,
          userId = req.user.id,
          commentTxt = req.body.comment;

    const comment = await Comments.add(commentTxt, postId, userId);
    res.status(200).json(comment);
  }
  catch(err) {
    res.status(500).json(err);//{ error: 'there was a problem adding the comment to the database' });
  };
});

router.put('/:id/comments/:cid', mw.restricted, mw.commentCheck, async (req, res) => {
  try {
    const id = req.params.cid,
          commentTxt = req.body.comment;

    const comment = await Comments.update(commentTxt, id);
    if(comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'the comment you are trying to update does not exist' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was an error updating the comment' });
  };
});

router.delete('/:id/comments/:cid', mw.restricted, async (req, res) => {
  try {
    const id = req.params.cid;

    const deleted = await Comments.remove(id);
    if(deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'that comment does not exist' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'there was an error deleting your comment' });
  };
});

module.exports = router;