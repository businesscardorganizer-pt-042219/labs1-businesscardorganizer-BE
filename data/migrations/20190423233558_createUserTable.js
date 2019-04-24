exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
		tbl.increments();
    tbl.string('user_name', 128).notNullable().unique();
    tbl.string('user_password').notNullable();
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};