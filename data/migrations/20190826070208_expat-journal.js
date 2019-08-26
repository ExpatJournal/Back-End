
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('username', 25)
      .notNullable()
      .unique();
    t.string('password', 25)
      .notNullable();
  })
  .createTable('journal', t => {
    t.increments();
    t.string('title', 255)
      .notNullable();
    t.integer('author_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.string('post', 21000);
    t.integer('created_date')
      .notNullable();
    t.integer('updated_date')
      .notNullable();
  })
  .createTable('media', t => {
    t.increments();
    t.integer('post_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('journal')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.string('url', 255)
      .notNullable();
    t.string('caption', 2100);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('media')
    .dropTableIfExists('journal')
    .dropTableIfExists('users');
};
