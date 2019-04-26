exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', tbl => {
		tbl.increments();
    tbl.string('event_name').notNullable();
    tbl.date('event_date');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events');
};