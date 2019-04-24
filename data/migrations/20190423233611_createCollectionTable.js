
exports.up = function(knex, Promise) {
  return knex.schema.createTable('collections', tbl => {
		tbl.increments();
    tbl
    .integer('user_id')
    .unique()
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

    tbl
    .integer('card_id')
    .unique()
    .unsigned()
    .references('id')
    .inTable('cards')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    tbl
    .integer('event_id')
    .unique()
    .unsigned()
    .references('id')
    .inTable('events')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('collections');
};
