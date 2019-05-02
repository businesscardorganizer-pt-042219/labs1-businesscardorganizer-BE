exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('collections').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('collections').insert([
        { user_id: '1', card_id: '1', event_id:'1'},
        { user_id: '1', card_id: '2', event_id:'2'},
        { user_id: '1', card_id: '3', event_id:'3'},
      ]);
    });
};


