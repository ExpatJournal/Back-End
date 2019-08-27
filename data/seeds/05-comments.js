exports.seed = function(knex, Promise) {
  return knex('comments').insert([
    {
      post_id: 1,
      author_id: 2,
      comment: "This is a comment. There are many like it, but this one is mine."
    },
  ])
}