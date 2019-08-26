exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      url: "www.example.com",
      post_id: 1,
      caption: "This media doesn't link anywhere"
    },
  ])
}