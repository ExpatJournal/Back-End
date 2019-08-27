exports.seed = function(knex, Promise) {
  return knex('media').insert([
    {
      url: "www.example.com",
      caption: "This media doesn't link anywhere",
      owner_id: 1
    },
    {
      url: "www.example.com/1",
      caption: "This media doesn't link anywhere",
      owner_id: 2
    },
    {
      url: "www.example.com/2",
      caption: "This media doesn't link anywhere",
      owner_id: 2
    },
    {
      url: "www.example.com/3",
      caption: "This media doesn't link anywhere",
      owner_id: 1
    },
  ])
}