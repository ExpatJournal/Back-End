const db = require('../config/config');

module.exports = {
  add,
  find,
  remove,
  update
}

function add(comment, post_id, author_id) {
  return db('comments')
            .insert({ comment, post_id, author_id }, 'id')
            .then( ids => {
              const [id] = ids;
              return findById(id);
            });
};

function find(post_id) {
  return db('comments')
          .where({post_id});
};

function findById(id) {
  return db('comments')
          .where({id})
          .first();
}

function update(comment, id) {
  return db('comments')
          .where({id})
          .update({ comment })
          .then( updated => updated && findById(id));
}

function remove(id) {
  return db('comments')
          .where({id})
          .del();
}