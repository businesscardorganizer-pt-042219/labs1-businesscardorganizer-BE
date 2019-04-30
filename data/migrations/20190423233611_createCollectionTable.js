
exports.up = function(knex, Promise) {
  return knex.schema.createTable('collections', tbl => {
		tbl.increments();
    tbl
    .integer('user_id')


    tbl
    .integer('card_id')
   
    tbl
    .integer('event_id')
  
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('collections');
};
