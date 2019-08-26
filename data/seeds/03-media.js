exports.seed = function(knex, Promise) {
  return knex('media').insert([
    {
      post_id: 1,
      url: "www.example.com",
      caption: "This media doesn't link anywhere"
    },
  ])
}