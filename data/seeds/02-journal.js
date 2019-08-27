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
    {
      title: "this a post by another user",
      author_id: 2,
      location: "Los Angeles, CA",
      post: "This is your first post. You can delete it or edit it.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
    {
      title: "This is Your second Post",
      author_id: 1,
      location: "Los Angeles, CA",
      post: "This is your second post.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
    {
      title: "This is Your third Post",
      author_id: 1,
      location: "Los Angeles, CA",
      post: "This is your thid post. WHOEVER YOU ARE.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
    {
      title: "SPAM IS GOOD FOR YOU",
      author_id: 2,
      location: "Los Angeles, CA",
      post: "Spam is great when cooked and cripsy.",
      created_date: Date.now(),
      updated_date: Date.now(),
    },
  ])
}