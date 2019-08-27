
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
    t.string('url', 255)
      .notNullable();
    t.string('caption', 2100);
    t.integer('owner_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
  .createTable('journal_media', t => {
    t.increments();
    t.unique([ 'post_id', 'media_id' ]);
    t.integer('post_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('journal')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.integer('media_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('media')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
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
    .dropTableIfExists('journal_media')
    .dropTableIfExists('media')
    .dropTableIfExists('journal')
    .dropTableIfExists('users');
};
