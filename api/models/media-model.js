const db = require('../config/config');

module.exports = {
  add,
  find,
  findAll,
  findById,
};

function findAll() {
  return db('media');
};

function find(id, limit, offset) {
  return db('journal_media AS jm')
          .innerJoin('media AS m', 'jm.media_id', 'm.id')
          .innerJoin('journal AS j', 'jm.post_id', 'j.id')
          .select('m.id', 'm.url', 'm.caption', 'm.owner_id', 'j.author_id')
          .where('jm.post_id', '=', id);
};

function add(mediaInfo) {
  return db('media')
          .insert(mediaInfo, 'id')
          .then( ids => {
            const [id] = ids;
            return findById(id);
          });
};

function findById(id) {
  return db('media').where({ id });
};