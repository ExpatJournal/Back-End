exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: "John",
      password: "$2b$14$jl0E1b6joN.Z6Wxlwb8QM.HMkun7r5Gn.NF1ufp0UrxGzQx5IAKyK",
    },
    {
      username: "Jane",
      password: "$2b$14$jl0E1b6joN.Z6Wxlwb8QM.HMkun7r5Gn.NF1ufp0UrxGzQx5IAKyK",
    }
  ])
}
