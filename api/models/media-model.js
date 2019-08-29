const db = require('../config/config');

module.exports = {
  add,
  addConnect,
  find,
  findAll,
  findById,
  remove,
  removeConn,
  update
};

function find(id) {
  return db('journal_media AS jm')
          .innerJoin('media AS m', 'jm.media_id', 'm.id')
          .innerJoin('journal AS j', 'jm.post_id', 'j.id')
          .select('m.id', 'm.url', 'm.caption', 'm.owner_id', 'j.author_id')
          .where('jm.post_id', '=', id);
};

function findAll() {
  return db('media');
};

function findById(id) {
  return db('media')
          .where({id})
          .first();
};

function add(mediaInfo) {
  return db('media')
          .insert(mediaInfo)
          .then( ids => {
            const [id] = ids;
            return findById(id);
          });
};

function addConnect(journalId, mediaId) {
  return db('journal_media')
          .returning('id')
          .insert({
            post_id: journalId,
            media_id: mediaId
          });
};

function remove(id) {
  return db('media')
          .where({ id })
          .del();
}

function removeConn(id) {
  return db('journal_media')
          .where({ media_id: id })
          .del();
}

function update(mediaInfo, id) {
  return db('media')
          .where({ id })
          .update(mediaInfo)
          .then( updated => updated && findById(id) );
};