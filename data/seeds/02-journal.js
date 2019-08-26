exports.seed = function(knex, Promise) {
  return knex('journal').insert([
    {
      title: "This is Your First Post",
      author_id: 1,
      location: "Los Angeles, CA",
      post: "This is your first post. You can delete it or edit it.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
  ])
}