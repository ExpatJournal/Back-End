const db = require('../config/config');

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

function add(postInfo) {
  return db('journal')
          .insert(postInfo, 'id')
          .then(ids => {
            const [id] = ids;
            return findById(id);
          });
};

function find(id) {
  return db('journal')
          .where('author_id', '=', id);
};

function findById(id) {
  return db('journal')
          .where({ id })
          .first();
}

function update(postInfo, id, userId) {
  return db('journal')
          .where( function() {
            this.where({ id })
              .andWhere('author_id', '=', userId)
          })
          .update(postInfo)
          .then( updated => {
            return updated && findById(id);
          });
}

function remove(id, userId) {
  return db('journal')
          .where( function() {
            this.where({ id })
              .andWhere('author_id', '=', userId)
          })
          .del();
}