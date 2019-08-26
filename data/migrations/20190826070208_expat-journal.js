
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('username', 25)
      .notNullable()
      .unique();
    t.string('displayName', 25)
      .notNullable()
      .unique();
    t.string('email', 30)
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
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.string('location', 255);
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
  })
  .createTable('comments', t => {
    t.increments();
    t.integer('post_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('journal')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.integer('author_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.string('comment', 2100)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments')
    .dropTableIfExists('media')
    .dropTableIfExists('journal')
    .dropTableIfExists('users');
};
