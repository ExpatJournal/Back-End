const db = require('../config/config');

module.exports = {
  add,
  findBy,
  findById,
};

function findBy(filter) {
  return db('users')
            .where(filter)
            .select('id','username');
};

function findById(id) {
  return db('users')
          .where({id})
          .select('id','username')
          .first();
};

function add(userCreds) {
  return db('users')
            .insert(userCreds, 'id')
            .then(ids => {
              const [id] = ids;
              return findById(id);
            });
};
