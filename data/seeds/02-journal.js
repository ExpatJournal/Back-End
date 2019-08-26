exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      title: "This is Your First Post",
      author_id: 1,
      post: "This is your first post. You can delete it or edit it.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
  ])
}