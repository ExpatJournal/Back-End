const db = require('../config/config');

module.exports = {
  add,
  find,
  findBy,
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

function find(limit, offset) {
  return db('journal')
          .offset(offset)
          .limit(limit);
};

function findBy(filter, limit, offset) {
  return db('journal')
          .where(filter)
          .offset(offset)
          .limit(limit);
}

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
          .del()
          .then( res => true );
}