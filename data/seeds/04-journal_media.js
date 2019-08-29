exports.seed = function(knex, Promise) {
  return knex('journal_media').insert([
    {
      post_id: 1,
      media_id: 1
    },
    {
      post_id: 1,
      media_id: 4
    },
    {
      post_id: 2,
      media_id: 3
    },
    {
      post_id: 2,
      media_id: 2
    },
  ])
}