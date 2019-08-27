exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: "john",
      displayName: "John",
      email: "john@email.com",
      password: "$2b$14$E3qgmoniDR4f4aELAnPMb.zIbOuwyD6ZfKtKSheWx5Txj./z5QtmO",
    },
    {
      username: "jane",
      displayName: "Jane",
      email: "jane@email.com",
      password: "$2b$14$E3qgmoniDR4f4aELAnPMb.zIbOuwyD6ZfKtKSheWx5Txj./z5QtmO",
    }
  ])
}
