
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        { event_name: 'Lambda Conference',
         event_date: '1.9.2019'},
         { event_name: 'IBM Conference',
         event_date: '1.9.2019'},
         { event_name: 'Oracle Conference',
         event_date: '1.9.2019'}

    
      ]);
    });
};

