exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', tbl => {
    tbl.increments();
    tbl.string('initial');
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('work_title');
    tbl.string('address1');
    tbl.string('address2');
    tbl.string('city');
    tbl.string('state');
    tbl.string('zip');
    tbl.string('country');
    tbl.string('company_name');
    tbl.string('cell_phone');
    tbl.string('work_phone');
    tbl.string('URL');
    tbl.string('QR_code');
    tbl.string('github');
    tbl.string('linkedIn');
    tbl.string('own_flag');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cards');
};